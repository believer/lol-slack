const leagueService = require('../services/league')
const fetch = require('node-fetch')
const slackFormat = require('./slackFormat')

function getLeague (summoner, region) {
  return new Promise(resolve => {
    leagueService(summoner, region)
      .toArray(league => resolve(league[0]))
  })
}

function answer (question) {
  return question ? 'Yes' : 'No'
}

function* league (summonerName, region, params) {
  const league = yield getLeague(summonerName, region)
  region = region.toUpperCase()

  const entries = league.entries[0]
  const division = `${league.tier} ${entries.division}`
  const winsLosses = `${entries.wins} / ${entries.losses}`
  var winRatio = entries.wins / (entries.wins + entries.losses)
  winRatio = `${(winRatio * 100).toFixed(2)}%`

  const hotStreak = answer(entries.isHotStreak)
  const veteran = answer(entries.isVeteran)
  const fresh = answer(entries.isFreshBlood)
  const inactive = answer(entries.isInactive)

  const response = {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - League for ${summonerName} (${region})*`,
    attachments: [
      {
        title: league.name,
        fields: [
          { title: 'Division', value: division, short: true },
          { title: 'Wins / Losses (ratio)', value: `${winsLosses} (${winRatio})`, short: true},
          { title: 'League points', value: entries.leaguePoints, short: true },
          { title: 'Hot streak',  value: hotStreak, short: true },
          { title: 'Veteran',  value: veteran, short: true },
          { title: 'New in league',  value: fresh, short: true },
          { title: 'Inactive',  value: inactive, short: true },
        ]
      }
    ]
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(response)
  }

  fetch(params.response_url, options)

  return slackFormat(response)
}

module.exports = league
