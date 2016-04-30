const topThreeChamps = require('../services/topThreeChamps')
const moment = require('moment')
const fetch = require('node-fetch')
const slackFormat = require('./slackFormat')

function fetchTopThree (summonerName, region, platform) {
  return new Promise(resolve => {
    topThreeChamps(summonerName, region, platform)
      .toArray(top => resolve(top))
  })
}

function* topThreeChampsLOL (summonerName, region, platform, params) {
  const champions = yield fetchTopThree(summonerName, region, platform)

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

  region = region.toUpperCase()
  const response = {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - Top three champions for ${summonerName} (${region})*`,
    attachments: attachments
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(response)
  }

  // Usually takes longer than 3000 ms.
  // Send the reponse to the provided response_url
  fetch(params.response_url, options)

  return slackFormat(response)
}

module.exports = topThreeChampsLOL
