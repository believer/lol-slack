const _ = require('highland')
const riot = require('./riot')

function recentGame (summonerName, region) {
  return _(riot.summonerByName(summonerName, region))
    .map(summoner => summoner[summonerName])
    .flatMap(summoner => _(riot.gameBySummoner(summoner, region)))
    .flatMap(summoner => _(riot.championById(summoner, null, region)))
}

module.exports = recentGame
