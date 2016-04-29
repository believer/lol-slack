const _ = require('highland')
const riot = require('./riot')

function masteryScore (summonerName, region, platform) {
  return _(riot.summonerByName(summonerName, region))
    .map(summoner => summoner[summonerName])
    .flatMap(summoner => _(riot.masteryScore(summoner, region, platform)))
}

module.exports = masteryScore
