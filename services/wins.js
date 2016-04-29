const riot = require('./riot')

function wins (summonerName, region) {
  return riot.summonerByName(summonerName, region)
    .then(summoner => summoner[summonerName])
    .then(summoner => riot.summonerStatsSummaryById(summoner, region))
    .then(summoner => {
      const wins = summoner.stats
        .reduce((a, b) => a + b.wins, 0)

      const stats = summoner.stats
        .map(types => ({
          title: types.playerStatSummaryType,
          value: types.wins,
          short: true
        }))
        .filter(gameTypes => gameTypes.value > 0)

      return {
        level: summoner.summonerLevel,
        fields: stats,
        wins: wins
      }
    })
}

module.exports = wins
