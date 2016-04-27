const riot = require('./riot')
const _ = require('highland')

function team (summonerName) {
  return _(riot.summonerByName(summonerName))
    .map(summoner => summoner[summonerName])
    .map(summoner => _(riot.teamBySummonerId(summoner)))
    .flatMap(team => team)
    .map(summoner => {
      return summoner.teams.map(team => {
        const roster = team.roster.memberList.map(member => {
          return member.playerId
        })

        return Object.assign(team, {
          roster: roster,
          ownerId: team.roster.ownerId,
          summonerName: summoner.name
        })
      })
    })
    .flatMap(team => team)
    .map(team => _(riot.summonerByIds(team, team.roster)))
    .flatMap(team => team)
    .map(team => {
      const memberList = Object.keys(team.roster).map(key => {
        const member = team.roster[key]
        return `${member.name} (lvl ${member.summonerLevel})${parseInt(key, 10) === team.ownerId ? ' (Owner)': ''}\n`
      }).join('')

      return Object.assign(team, {
        roster: memberList
      })
    })
}

module.exports = team
