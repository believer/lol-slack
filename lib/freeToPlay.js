const freeToPlayService = require('../services/freeToPlay')
const fetch = require('node-fetch')
const slackFormat = require('./slackFormat')

function getChampions (region) {
  return new Promise(resolve => {
    freeToPlayService(region)
      .toArray(champions => resolve(champions))
  })
}

function* freeToPlay (region, params) {
  const champions = yield getChampions(region)
  region = region.toUpperCase()

  const response = {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - Free to play champions (${region})*`,
    attachments: [{
      fields: champions
    }]
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(response)
  }

  fetch(params.response_url, options)

  return slackFormat(response)
}

module.exports = freeToPlay
