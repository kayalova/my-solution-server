const ERROR_MSG = {
  SNIPPET: {
    CREATE_FAILED: 'Unable to create snippet',
    REMOVE_FAILED: 'Unable to delete snippet',
    FIND_FAILED: 'Unable to find snippets'
  }
}

const SNIPPET_FILTERS = [
  'startDate',
  'endDate',
  'category',
  'userFilename',
  'description'
]

const RESPONSE = {
  SUCCESSFULLY_CREATED: 'Snippet successfully created',
  SUCCESSFULLY_DELETED: 'Snippet successfully deleted'
}

module.exports = {
  ERROR_MSG,
  SNIPPET_FILTERS,
  RESPONSE
}
