const _ = require('highland')
const riot = require('./riot')

function rankedMatches (summonerName, region) {
  return _(riot.summonerByName(summonerName, region))
    .map(summoner => summoner[summonerName])
    .flatMap(summoner => _(riot.rankedMatches(summoner, region)))
    .flatMap(matches => matches.matches)
    .map(match => _(riot.championById(match, match.champion, region)))
    .flatMap(match => match)
    .map(match => _(riot.match(match, region)))
    .flatMap(match => match)
}

module.exports = rankedMatches
