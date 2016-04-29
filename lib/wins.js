const wins = require('../services/wins')
const fetch = require('node-fetch')
const slackFormat = require('./slackFormat')

function* winsLOL (summonerName, region, params) {
  const summonerInfo = yield wins(summonerName, region)
  region = region.toUpperCase()

  const response = {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - Wins for ${summonerName} (lvl ${summonerInfo.level}) (${region})*`,
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

  return slackFormat(response)
}

module.exports = winsLOL
