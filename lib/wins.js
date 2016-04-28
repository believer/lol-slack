const wins = require('../services/wins')
const fetch = require('node-fetch')
const _ = require('lodash')

function* winsLOL (summonerName, params) {
  const summonerInfo = yield wins(summonerName)

  const response = {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - Wins for ${summonerName} (lvl ${summonerInfo.level})*`,
    attachments: [
      {
        title: `Total wins: ${summonerInfo.wins}`,
        fields: summonerInfo.fields
      }
    ]
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

module.exports = winsLOL
