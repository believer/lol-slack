const _ = require('highland')
const riot = require('./riot')

function league (summonerName, region) {
  return _(riot.summonerByName(summonerName, region))
    .map(summoner => summoner[summonerName])
    .flatMap(summoner => _(riot.league(summoner, region)))
}

module.exports = league
