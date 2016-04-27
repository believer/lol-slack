'use strict'

const _ = require('highland')
const fetch = require('../utils/fetch')
const riot = require('./riot')

function recentGame (summonerName) {
  return _(riot.summonerByName(summonerName))
    .map(summoner => summoner[summonerName])
    .flatMap(summoner => _(riot.gameBySummoner(summoner)))
    .flatMap(summoner => _(riot.championById(summoner)))
}

module.exports = recentGame
