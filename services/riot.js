const BASE = process.env.LOL_BASE
const GLOBAL_BASE = process.env.LOL_GLOBAL
const KEY = process.env.RIOT_API_KEY
const fetch = require('../utils/fetch')

function prepUrl (url, base, options) {
  return `${base || BASE}${url}?api_key=${KEY}${options || ''}`
}

function championById (summoner, id) {
  const url = prepUrl(`/v1.2/champion/${id || summoner.match.championId}`, GLOBAL_BASE, '&champData=blurb,image')

  return fetch(url)
    .then(data => Object.assign(summoner, { champion: data }))
}

function gameBySummoner (summoner) {
  const url = prepUrl(`/v1.3/game/by-summoner/${summoner.id}/recent`)

  return fetch(url)
    .then(data => Object.assign(summoner, { match: data.games[0] }))
}

function summonerByIds (team, summoners) {
  const url = prepUrl(`/v1.4/summoner/${summoners}`)

  return fetch(url)
    .then(data => Object.assign(team, { roster: data }))
}

function summonerByName (summonerName) {
  const url = prepUrl(`/v1.4/summoner/by-name/${summonerName}`)

  return fetch(url)
}

function summonerStatsSummaryById (summoner) {
  const url = prepUrl(`/v1.3/stats/by-summoner/${summoner.id}/summary`)

  return fetch(url)
    .then(data => Object.assign(summoner, { stats: data.playerStatSummaries }))
}

function topThreeChampions (summoner) {
  const url = prepUrl(`/championmastery/location/EUN1/player/${summoner.id}/topchampions`, 'https://eune.api.pvp.net/')

  return fetch(url)
}

function champions () {
  const url = prepUrl('/v1.2/champion')

  return fetch(url)
}

function teamBySummonerId (summoner) {
  const url = prepUrl(`/v2.4/team/by-summoner/${summoner.id}`)

  return fetch(url)
    .then(data => Object.assign(summoner, { teams: data[summoner.id] }))
}

function status (region) {
  const url = prepUrl(`/shards/${region.toLowerCase()}`, 'http://status.leagueoflegends.com')

  return fetch(url)
}

module.exports = {
  champions: champions,
  championById: championById,
  gameBySummoner: gameBySummoner,
  status: status,
  summonerByIds: summonerByIds,
  summonerByName: summonerByName,
  summonerStatsSummaryById: summonerStatsSummaryById,
  teamBySummonerId: teamBySummonerId,
  topThreeChampions: topThreeChampions
}
