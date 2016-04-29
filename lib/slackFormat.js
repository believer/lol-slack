const _ = require('lodash')

module.exports = function slackFormat (response) {
  const responseWithoutType = _.omit(response, 'response_type')

  responseWithoutType.url = [
    'https://api.slack.com/docs/formatting/builder?msg=',
    encodeURI(JSON.stringify(responseWithoutType))
  ].join('')

  return responseWithoutType
}
