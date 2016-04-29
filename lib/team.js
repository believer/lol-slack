const teamService = require('../services/team')
const moment = require('moment')
const fetch = require('node-fetch')
const _ = require('lodash')
const slackFormat = require('./slackFormat')

function getTeam (summonerName, region) {
  return new Promise(resolve => {
    teamService(summonerName, region)
      .toArray(team => resolve(team))
  })
}

function fixTeams (teams) {
  if (_.isNull(teams[0])) {
    return [{
      title: 'No teams for summoner.'
    }]
  }

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

function *team (summonerName, region, params) {
  const teams = yield getTeam(summonerName, region)
  const fields = fixTeams(teams)
  region = region.toUpperCase()

  const response = {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - Team for ${summonerName} (${region})*`,
    attachments: fields
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(response)
  }

  fetch(params.response_url, options)
    .then(res => console.log(res))

  return slackFormat(response)
}

module.exports = team
