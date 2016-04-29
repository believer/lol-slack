const recentGame = require('../services/latestGame')
const timeParser = require('../utils/timeParser')
const fetch = require('node-fetch')
const slackFormat = require('./slackFormat')

function fetchGame (summonerName, region) {
  return new Promise(resolve => {
    recentGame(summonerName, region)
      .toArray(game => resolve(game))
  })
}

function* latestLOL (summonerName, region, params) {
  const game = yield fetchGame(summonerName, region)

  const summoner = game[0]
  const stats = summoner.match.stats
  const win = stats.win ? 'victory' : 'defeat'
  const champion = summoner.champion

  const kills = stats.championsKilled || 0
  const deaths = stats.numDeaths || 0
  const assists = stats.assists || 0

  const score = `${kills} / ${deaths} / ${assists}`
  const kda = ((kills + assists) / deaths).toFixed(2)
  const cs = stats.minionsKilled + (stats.neutralMinionsKilled || 0)
  const wards = `${stats.wardPlaced} / ${stats.wardKilled ? stats.wardKilled : 0}`
  const image = champion.image ? `http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/${champion.image.full}` : ''

  const multikills = [
    'Single kill',
    'Double kill',
    'Triple kill',
    'Quadra kill',
    'Pentakill'
  ]

  const response = {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - Latest game for ${summonerName} *\nThe game ended in _${win}_ after ${timeParser(stats.timePlayed)}`,
    attachments: [
      {
        mrkdwn_in: ['text'],
        title: `${champion.name} - ${champion.title}`,
        thumb_url: image,
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

  const options = {
    method: 'POST',
    body: JSON.stringify(response)
  }

  fetch(params.response_url, options)
    .then(res => console.log(res))

  return slackFormat(response)
}

module.exports = latestLOL
