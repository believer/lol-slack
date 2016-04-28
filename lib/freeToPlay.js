const freeToPlayService = require('../services/freeToPlay')
const fetch = require('node-fetch')

function getChampions () {
  return new Promise(resolve => {
    freeToPlayService()
      .toArray(champions => resolve(champions))
  })
}

function* freeToPlay (params) {
  const champions = yield getChampions()

  const response = {
    response_type: 'in_channel',
    mrkdwn: true,
    text: '*League of Legends - Free to play champions*',
    attachments: [{
      fields: champions
    }]
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(response)
  }

  fetch(params.response_url, options)
    .then(res => console.log(res))

  const responseWithoutType = _.omit(response, 'response_type')

  console.log(encodeURI(JSON.stringify(responseWithoutType)))

  return responseWithoutType
}

module.exports = freeToPlay
