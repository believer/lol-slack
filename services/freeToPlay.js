const riot = require('./riot')
const _ = require('highland')

function freeToPlay (region) {
  return _(riot.champions(region))
    .flatMap(result => result.champions)
    .map(champion => _(riot.championById(champion, champion.id, region)))
    .flatMap(champion => champion)
    .map(champion => ({
      title: champion.champion.name,
      value: champion.champion.title,
      short: true
    }))
}

module.exports = freeToPlay
