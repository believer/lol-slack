const teamService = require('../services/lol/team')
const moment = require('moment')
const fetch = require('node-fetch')

function getTeam (summonerName) {
  return new Promise(resolve => {
    teamService(summonerName)
      .toArray(team => resolve(team))
  })
}

function fixTeams (teams) {
  return teams.map(team => {
    const rankedFive = team.teamStatDetails
      .filter(stat => stat.teamStatType === 'RANKED_TEAM_5x5')[0]

    const rankedThree = team.teamStatDetails
      .filter(stat => stat.teamStatType === 'RANKED_TEAM_3x3')[0]

    return {
      mrkdwn_in: ['text'],
      title: `[${team.tag}] - ${team.name}`,
      fields: [
        {
          title: 'Ranked 5v5 (wins/losses)',
          value: `${rankedFive.wins} / ${rankedFive.losses}`,
          short: true
        },
        {
          title: 'Ranked 3v3 (wins/losses)',
          value: `${rankedThree.wins} / ${rankedThree.losses}`,
          short: true
        },
        {
          title: 'Created on',
          value: moment(team.createDate).format('YYYY-MM-DD HH:mm'),
          short: true
        },
        {
          title: 'Roster',
          value: team.roster,
          short: true
        }
      ]
    }
  })
}

function *team (summonerName, params) {
  const teams = yield getTeam(summonerName)
  const fields = fixTeams(teams)

  const options = {
    method: 'POST',
    body: JSON.stringify({
      response_type: 'in_channel',
      mrkdwn: true,
      text: `*League of Legends - Team for ${summonerName}*`,
      attachments: fields
    })
  }

  // Usually takes longer than 3000 ms.
  // Send the reponse to the provided response_url
  fetch(params.response_url, options)
    .then(res => console.log(res))

  return { success: true }
}

module.exports = team
