const _ = require('highland')
const riot = require('./riot')

function topThreeChamps (summonerName) {
  return _(riot.summonerByName(summonerName))
    .map(summoner => summoner[summonerName])
    .flatMap(summoner => _(riot.topThreeChampions(summoner)))
    .flatMap(champion => champion)
    .map(champion => _(riot.championById(champion, champion.championId)))
    .flatMap(champion => champion)
}

module.exports = topThreeChamps
