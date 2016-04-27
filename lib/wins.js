const wins = require('../services/lol/wins')

function* winsLOL (summonerName) {
  const summonerInfo = yield wins(summonerName)

  return {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - Wins for ${summonerName} (lvl ${summonerInfo.level})*`,
    attachments: [
      {
        title: `Total wins: ${summonerInfo.wins}`,
        fields: summonerInfo.fields
      }
    ]
  }
}

module.exports = winsLOL
