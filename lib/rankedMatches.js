const rankedMatchesService = require('../services/rankedMatches')
const fetch = require('node-fetch')
const slackFormat = require('./slackFormat')
const moment = require('moment')
const timeParser = require('../utils/timeParser')

function getRanked (summoner, region) {
  return new Promise(resolve => {
    rankedMatchesService(summoner, region)
      .toArray(champions => resolve(champions))
  })
}

function fixMatches(matches) {
  if (!matches.length) {
    return [
      { title: 'No matches in the last 24 hours' }
    ]
  }

  return matches.map(match => {
    return {
      mrkdwn_in: ['text'],
      thumb_url: `http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/${match.champion.image.full}`,
      title: `Match played on ${moment(match.timestamp).format('YYYY-MM-DD HH:mm')}`,
      fields: [
        { title: 'Lane', value: match.lane, short: true },
        { title: 'Role', value: match.role, short: true },
        { title: 'Champion', value: match.champion.name, short: true },
        { title: 'Duration', value: timeParser(match.match.matchDuration), short: true }
      ]
    }
  })
}

function* rankedMatches (summoner, region, params) {
  const matches = yield getRanked(summoner, region)
  region = region.toUpperCase()

  const fixedMatches = fixMatches(matches)

  const response = {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - Ranked matches last 24 hours for ${summoner} (${region})*`,
    attachments: fixedMatches
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(response)
  }

  fetch(params.response_url, options)

  return slackFormat(response)
}

module.exports = rankedMatches
