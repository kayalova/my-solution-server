const path = require('path')
const mongoose = require('mongoose')
const { ROOT } = require('../config')
const Snippet = require('../db/models/snippet')

const _id1 = new mongoose.Types.ObjectId()
const userFilename1 = 'App.js'
const filename1 = `${_id1}-${userFilename1}`

const _id2 = new mongoose.Types.ObjectId()
const userFilename2 = 'utils.py'
const filename2 = `${_id2}-${userFilename2}`
const data = [
    {
        _id: _id1,
        userFilename: userFilename1,
        category: 'frontend',
        description: 'React application main class',
        createdDate: 100,
        codePreview: `import React from 'react'
        import { useSelector } from 'react-redux'
        
        import Header from './Header'
        import Aside from './Aside/'
        import SnippetPreview from './SnippetPreview'
        import './App.sass'
        
        const App = () => {
            const snippets = useSelector(state => state.snippets)`,
        filename: filename1,
        pathToFile: path.join(ROOT, 'data', 'files', filename1)
    },
    {
        _id: _id2,
        userFilename: userFilename2,
        category: 'backend',
        description: 'very usefull and meaningfull',
        createdDate: 1578268245348,
        codePreview: `class FileProxyMixin:
        """
        A mixin class used to forward file methods to an underlaying file
        object.  The internal file object has to be called "file"::
            class FileProxy(FileProxyMixin):
                def __init__(self, file):
                    self.file = file
        """
    
        encoding = property(lambda self: self.file.encoding)`,
        filename: filename2,
        pathToFile: path.join(ROOT, 'data', 'files', filename2)
    }
]


/* --------- test initial data ---------- */
// const first = new Snippet(data[0]).save()
// const second = new Snippet(data[1]).save()

module.exports = data