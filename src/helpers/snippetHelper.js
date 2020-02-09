const path = require('path')
const mongoose = require('mongoose')
const Snippet = require('../models/db/Snippet')
const fileHelper = require('../helpers/fileHelper')
const categoryHelper = require('../helpers/categoryHelper')
const { ERROR_MSG } = require('../constants')

const getPath = filename => path.join(ROOT_PATH, 'data', 'files', filename)

const regexIndexOf = (str, regex, startIndex = 0) => {
  const s = str.substring(startIndex).search(regex)
  return s === -1 ? s : s + startIndex
}

const getCodePreview = str => {
  let codePreviewStr = ''
  let start = 0
  let end = 0
  let linesCount = 0

  end = regexIndexOf(str, /[\r\n]/, start)
  if (end === -1 && str.trim()) return str

  while (end !== -1 && linesCount < 10) {
    end = regexIndexOf(str, /[\r\n]/, start)
    line = str.slice(start, end)
    codePreviewStr += `${line}\r\n`
    start = end + 1
    linesCount += 1
  }
  return codePreviewStr.slice(0, -1)
}

const prepare = async (originalFilename, category, description, code) => {
  const _id = new mongoose.Types.ObjectId()
  const filename = `${_id}-${originalFilename}`
  const createdAt = new Date().getTime()
  const codePreview = getCodePreview(code)
  const pathToFile = getPath(filename)
  const catId = await categoryHelper.getCategoryId(category)

  return new Snippet({
    _id,
    filename,
    pathToFile,
    userFilename: originalFilename,
    category: catId,
    description,
    codePreview,
    createdAt
  })
}

const create = async (snippet, code) => {
  try {
    await fileHelper.write(snippet.pathToFile, code)
    await snippet.save()
  } catch (err) {
    throw new Error(ERROR_MSG.SNIPPET.CREATE_FAILED)
  }
}

const remove = async _id => {
  try {
    const snippet = await Snippet.findByIdAndRemove({ _id })
    await fileHelper.remove(snippet.pathToFile)
  } catch (err) {
    throw new Error(ERROR_MSG.SNIPPET.REMOVE_FAILED)
  }
}

const find = async filterSnippet => {
  try {
    const snippets = await Snippet.find(filterSnippet)
      .select('-pathToFile -filename -__v')
      .populate('category', '-_id -__v')
    return snippets
  } catch (err) {
    throw new Error(ERROR_MSG.SNIPPET.FIND_FAILED)
  }
}

const snippetHepler = {
  prepare,
  create,
  find,
  remove
}

module.exports = snippetHepler
