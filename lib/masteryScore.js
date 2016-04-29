const masteryScoreService = require('../services/masteryScore')
const fetch = require('node-fetch')
const slackFormat = require('./slackFormat')

function getMasteryScore (summoner, region, platform) {
  return new Promise(resolve => {
    masteryScoreService(summoner, region, platform)
      .toArray(champions => resolve(champions))
  })
}

function* masteryScore (summoner, region = 'eune', platform, params) {
  const score = yield getMasteryScore(summoner, region, platform)
  region = region.toUpperCase()

  const response = {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - Mastery score for ${summoner} is _${score}_ (${region})*`
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(response)
  }

  fetch(params.response_url, options)
    .then(res => console.log(res))

  return slackFormat(response)
}

module.exports = masteryScore
