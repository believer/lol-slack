const topThreeChamps = require('../services/lol/topThreeChamps')
const moment = require('moment')
const fetch = require('node-fetch')

function fetchTopThree (summonerName) {
  return new Promise(resolve => {
    topThreeChamps(summonerName)
      .toArray(top => resolve(top))
  })
}

function* topThreeChampsLOL (summonerName, params) {
  const champions = yield fetchTopThree(summonerName)

  const attachments = champions.map(champion => {
    const champ = champion.champion

    return {
      title: `${champ.name} - ${champ.title} (lvl ${champion.championLevel})`,
      thumb_url: `http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/${champ.image.full}`,
      fields: [
        {
          value: champ.blurb
        },
        {
          title: 'Highest grade',
          value: champion.highestGrade,
          short: true
        },
        {
          title: 'Champion points',
          value: champion.championPoints,
          short: true
        },
        {
          title: 'Latest playtime',
          value: moment(champion.lastPlayTime).format('YYYY-MM-DD HH:mm'),
          short: true
        },
        {
          title: 'Chest granted',
          value: champion.chestGranted ? 'Yes' : 'No',
          short: true
        }
      ]
    }
  })

  const options = {
    method: 'POST',
    body: JSON.stringify({
      response_type: 'in_channel',
      mrkdwn: true,
      text: `*League of Legends - Top three champions for ${summonerName}*`,
      attachments: attachments
    })
  }

  // Usually takes longer than 3000 ms.
  // Send the reponse to the provided response_url
  fetch(params.response_url, options)
  	.then(res => console.log(res))

  return { success: true }
}

module.exports = topThreeChampsLOL
