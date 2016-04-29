const riot = require('./riot')
const _ = require('highland')

function team (summonerName, region) {
  return _(riot.summonerByName(summonerName, region))
    .map(summoner => summoner[summonerName])
    .map(summoner => _(riot.teamBySummonerId(summoner, region)))
    .flatMap(team => team)
    .map(summoner => {
      if (summoner.teams) {
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
      }

      return [{}]
    })
    .flatMap(team => team)
    .map(team => _(riot.summonerByIds(team, team.roster, region)))
    .flatMap(team => team)
    .map(team => {
      if (team.roster) {
        const memberList = Object.keys(team.roster).map(key => {
          const member = team.roster[key]
          return `${member.name} (lvl ${member.summonerLevel})${parseInt(key, 10) === team.ownerId ? ' (Owner)': ''}\n`
        }).join('')

        return Object.assign(team, {
          roster: memberList
        })
      }

      return null
    })
}

module.exports = team
