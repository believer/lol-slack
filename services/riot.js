const BASE = process.env.LOL_BASE
const GLOBAL_BASE = process.env.LOL_GLOBAL
const KEY = process.env.RIOT_API_KEY
const _ = require('lodash')
const moment = require('moment')
const fetch = require('../utils/fetch')
const prepUrl = require('../utils/prepUrl')

/**
 * Get all champions
 * @param  {bool} freeToPlay
 * @return {Promise}
 */
function champions (freeToPlay) {
  const options = freeToPlay ? '&freeToPlay=true' : null
  const url = prepUrl('/v1.2/champion', null, BASE, options)

  return fetch(url)
}

/**
 * Get a champion by id and append it to the provided object
 * @param  {object} summoner
 * @param  {string} id
 * @return {Promise}
 */
function championById (summoner, id) {
  const url = prepUrl(`/v1.2/champion/${id || summoner.match.championId}`, null, GLOBAL_BASE, '&champData=blurb,image')

  return fetch(url)
    .then(data => Object.assign(summoner, { champion: data }))
}

/**
 * Get all champoion masteries for a summoner
 * @param  {object} summoner
 * @param  {string} region
 * @param  {string} platform
 * @return {Promise}
 */
function championMasteryAll (summoner, region, platform) {
  const url = prepUrl(`/championmastery/location/${platform}/player/${summoner.id}/champions`, null, 'https://eune.api.pvp.net')

  return fetch(url)
}

/**
 * Get a game by summoner ID and append it to the provided object
 * @param  {object} summoner
 * @param  {string} region
 * @return {Promise}
 */
function gameBySummoner (summoner, region) {
  const url = prepUrl(`/v1.3/game/by-summoner/${summoner.id}/recent`, region)

  return fetch(url)
    .then(data => Object.assign(summoner, { match: data.games[0] }))
}

/**
 * Get league and division statistics
 * @param  {object} summoner
 * @param  {string} region
 * @return {Promise}
 */
function league (summoner, region) {
  const url = prepUrl(`/v2.5/league/by-summoner/${summoner.id}/entry`, region)

  return fetch(url)
    .then(league => league[summoner.id][0])
}

/**
 * Get total mastery score
 * @param  {object} summoner
 * @param  {string} region
 * @param  {string} platform
 * @return {Promise}
 */
function masteryScore (summoner, region, platform) {
  const url = prepUrl(`/championmastery/location/${platform}/player/${summoner.id}/score`, null, 'https://eune.api.pvp.net')

  return fetch(url)
}

/**
 * Get match statistics and append it to the provided match
 * @param  {object} match
 * @param  {string} region
 * @return {Promise}
 */
function match (match, region) {
  const url = prepUrl(`/v2.2/match/${match.matchId}`, region)

  return fetch(url)
    .then(data => Object.assign(match, { match: data }))
}

/**
 * Get ranked matches from the last 24 hours
 * @param  {object} summoner
 * @param  {string} region
 * @return {Promise}
 */
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

/**
 * Get server statuses for a region
 * @param  {string} region
 * @return {Promise}
 */
function status (region) {
  const url = prepUrl(`/shards/${region.toLowerCase()}`, null, 'http://status.leagueoflegends.com')

  return fetch(url)
}

/**
 * Get summoners by IDs and append it to the provided object
 * @param  {object} tea
 * @param  {string} summoners
 * @param  {string} region
 * @return {Promise}
 */
function summonerByIds (team, summoners, region) {
  const url = prepUrl(`/v1.4/summoner/${summoners}`, region)

  if (_.isEmpty(team)) {
    return new Promise(resolve => resolve([{}]))
  }

  return fetch(url)
    .then(data => Object.assign(team, { roster: data }))
}

/**
 * Get summoner information by name
 * @param  {string} summonerName
 * @param  {string} region
 * @return {Promise}
 */
function summonerByName (summonerName, region) {
  const url = prepUrl(`/v1.4/summoner/by-name/${summonerName}`, region)

  return fetch(url)
}

/**
 * Get summoner stats and append it to the provided object
 * @param  {object} summoner
 * @param  {string} region
 * @return {Promise}
 */
function summonerStatsSummaryById (summoner, region) {
  const url = prepUrl(`/v1.3/stats/by-summoner/${summoner.id}/summary`, region)

  return fetch(url)
    .then(data => Object.assign(summoner, { stats: data.playerStatSummaries }))
}

/**
 * Get teams via a summoner id and append it to the provided object
 * @param  {object} summoner
 * @param  {string} region
 * @return {Promise}
 */
function teamBySummonerId (summoner, region) {
  const url = prepUrl(`/v2.4/team/by-summoner/${summoner.id}`, region)

  return fetch(url)
    .then(data => Object.assign(summoner, { teams: data[summoner.id] }))
}

/**
 * Get top three champions of a summoner
 * @param  {object} summoner
 * @param  {string} region
 * @param  {string} platform
 * @return {Promise}
 */
function topThreeChampions (summoner, region, platform) {
  const url = prepUrl(`/championmastery/location/${platform}/player/${summoner.id}/topchampions`, null, 'https://eune.api.pvp.net')

  return fetch(url)
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
