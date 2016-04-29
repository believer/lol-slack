const _ = require('highland')
const riot = require('./riot')

function topThreeChamps (summonerName, region, platform) {
  return _(riot.summonerByName(summonerName, region))
    .map(summoner => summoner[summonerName])
    .flatMap(summoner => _(riot.topThreeChampions(summoner, region, platform)))
    .flatMap(champion => champion)
    .map(champion => _(riot.championById(champion, champion.championId, region)))
    .flatMap(champion => champion)
}

module.exports = topThreeChamps
