const riot = require('./riot')
const _ = require('highland')

function freeToPlay () {
  return _(riot.champions())
    .flatMap(result => result.champions)
    .filter(champion => champion.freeToPlay)
    .map(champion => _(riot.championById(champion, champion.id)))
    .flatMap(champion => champion)
    .map(champion => ({
      title: champion.champion.name,
      value: champion.champion.title,
      short: true
    }))
}

module.exports = freeToPlay
