'use strict'

const recentGame = require('../services/lol/latestGame')
const timeParser = require('../utils/timeParser')

function fetchGame (summonerName) {
  return new Promise(resolve => {
    recentGame(summonerName)
      .toArray(game => resolve(game))
  })
}

function* latestLOL (summonerName) {
  const game = yield fetchGame(summonerName.toLowerCase())

  const summoner = game[0]
  const stats = summoner.match.stats
  const win = stats.win ? 'victory' : 'defeat'
  const champion = summoner.champion

  const score = `${stats.championsKilled} / ${stats.numDeaths} / ${stats.assists}`
  const kda = (stats.championsKilled + stats.assists) / stats.numDeaths
  const cs = stats.minionsKilled + (stats.neutralMinionsKilled || 0)
  const wards = `${stats.wardPlaced} / ${stats.wardKilled ? stats.wardKilled : 0}`

  const multikills = [
    'Single kill',
    'Double kill',
    'Triple kill',
    'Quadra kill',
    'Pentakill'
  ]

  return {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - Latest game for ${summonerName} *\nThe game ended in _${win}_ after ${timeParser(stats.timePlayed)}`,
    attachments: [
      {
        mrkdwn_in: ['text'],
        title: `${champion.name} - ${champion.title}`,
        thumb_url: `http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/${champion.image.full}`,
        fields: [
          { title: 'Score', value: score, short: true },
          { title: 'KDA', value: kda, short: true },
          { title: 'CS', value: cs, short: true },
          { title: 'Gold', value: stats.goldEarned, short: true },
          { title: 'Multikill', value: multikills[stats.largestMultiKill - 1], short: true },
          { title: 'Level', value: stats.level, short: true },
          { title: 'Wards (placed/killed)', value: wards, short: true }
        ]
      }
    ]
  }
}

module.exports = latestLOL
