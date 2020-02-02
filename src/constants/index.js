const ERROR_MSG = {
  SNIPPET: {
    CREATE_FAILED: 'Не удалось создать сниппет',
    REMOVE_FAILED: 'Не удалось удалить сниппет',
    FIND_FAILED: 'Не удалось найти сниппеты'
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
