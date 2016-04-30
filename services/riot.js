const BASE = process.env.LOL_BASE
const GLOBAL_BASE = process.env.LOL_GLOBAL
const KEY = process.env.RIOT_API_KEY
const fetch = require('../utils/fetch')
const _ = require('lodash')
const moment = require('moment')

function prepUrl (url, region, base, options) {
  region = region || 'eune'
  base = base || BASE
  options = options || ''

  base = base.replace('{region}', region)
  return `${base}${url}?api_key=${KEY}${options}`
}

function championById (summoner, id, region) {
  const url = prepUrl(`/v1.2/champion/${id || summoner.match.championId}`, region, GLOBAL_BASE, '&champData=blurb,image')

  return fetch(url)
    .then(data => Object.assign(summoner, { champion: data }))
}

function gameBySummoner (summoner, region) {
  const url = prepUrl(`/v1.3/game/by-summoner/${summoner.id}/recent`, region)

  return fetch(url)
    .then(data => Object.assign(summoner, { match: data.games[0] }))
}

function summonerByIds (team, summoners, region) {
  const url = prepUrl(`/v1.4/summoner/${summoners}`, region)

  if (_.isEmpty(team)) {
    return new Promise(resolve => resolve([{}]))
  }

  return fetch(url)
    .then(data => Object.assign(team, { roster: data }))
}

function summonerByName (summonerName, region) {
  const url = prepUrl(`/v1.4/summoner/by-name/${summonerName}`, region)

  return fetch(url)
}

function summonerStatsSummaryById (summoner, region) {
  const url = prepUrl(`/v1.3/stats/by-summoner/${summoner.id}/summary`, region)

  return fetch(url)
    .then(data => Object.assign(summoner, { stats: data.playerStatSummaries }))
}

function topThreeChampions (summoner, region, platform) {
  const url = prepUrl(`/championmastery/location/${platform}/player/${summoner.id}/topchampions`, null, 'https://eune.api.pvp.net')

  return fetch(url)
}

function championMasteryAll (summoner, region, platform) {
  const url = prepUrl(`/championmastery/location/${platform}/player/${summoner.id}/champions`, null, 'https://eune.api.pvp.net')

  return fetch(url)
}

function masteryScore (summoner, region, platform) {
  const url = prepUrl(`/championmastery/location/${platform}/player/${summoner.id}/score`, null, 'https://eune.api.pvp.net')

  return fetch(url)
}

function champions (region) {
  const url = prepUrl('/v1.2/champion', region, BASE, '&freeToPlay=true')

  return fetch(url)
}

function teamBySummonerId (summoner, region) {
  const url = prepUrl(`/v2.4/team/by-summoner/${summoner.id}`, region)

  return fetch(url)
    .then(data => Object.assign(summoner, { teams: data[summoner.id] }))
}

function match (match, region) {
  const url = prepUrl(`/v2.2/match/${match.matchId}`, region)

  return fetch(url)
    .then(data => Object.assign(match, { match: data }))
}

function rankedMatches (summoner, region) {
  const time = moment()
    .subtract(1, 'day')
    .hour(0)
    .minute(0)
    .second(0)
    .format('x')

  const url = prepUrl(`/v2.2/matchlist/by-summoner/${summoner.id}`, region, BASE, `&rankedQueues=TEAM_BUILDER_DRAFT_RANKED_5x5&seasons=SEASON2016&beginTime=${time}`)

  return fetch(url)
}

function status (region) {
  const url = prepUrl(`/shards/${region.toLowerCase()}`, null, 'http://status.leagueoflegends.com')

  return fetch(url)
}

function league (summoner, region) {
  const url = prepUrl(`/v2.5/league/by-summoner/${summoner.id}/entry`, region)

  return fetch(url)
    .then(league => league[summoner.id][0])
}


module.exports = {
  championById: championById,
  championMasteryAll: championMasteryAll,
  champions: champions,
  gameBySummoner: gameBySummoner,
  league: league,
  match: match,
  masteryScore: masteryScore,
  rankedMatches: rankedMatches,
  status: status,
  summonerByIds: summonerByIds,
  summonerByName: summonerByName,
  summonerStatsSummaryById: summonerStatsSummaryById,
  teamBySummonerId: teamBySummonerId,
  topThreeChampions: topThreeChampions
}
