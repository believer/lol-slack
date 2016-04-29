const slackFormat = require('./slackFormat')

const text = '*League of Legends*'+
  '\n==============================================\n' +
  '*Commands:*\n\n' +
  'Region is EUNE, EUW, NA and so on.\n' +
  'Platform is EUN1, EUW1, NA1 and so on.\n' +
  '`/lol freeToPlay <region>`\n' +
  'Displays the current champions that are free to play\n' +
  '`/lol latest <summonerName> <region>`\n' +
  'Displays the latest match\n' +
  '`/lol masteryScore <summonerName> <region> <platform>`\n' +
  'Displays the total mastery score\n' +
  '`/lol rankedMatches <summonerName> <region>`\n' +
  'Displays ranked matches from the last 24 hours\n' +
  '`/lol status <region>`\n' +
  'Displays the status of the servers.\n' +
  '`/lol team <summonerName> <region>`\n' +
  'Displays the teams of a summoner\n' +
  '`/lol topThreeChamps <summonerName> <region> <platform>`\n' +
  'Displays the top three champions played\n' +
  '`/lol wins <summonerName> <region>`\n' +
  'Displays wins for all categories\n' +
 '\n==============================================\n' +
  '`/lol help`\n' +
  'Displays this information\n'

function help () {
  const response = {
    response_type: 'ephemeral',
    text: text,
    mrkdwn: true
  }

  return slackFormat(response)
}

module.exports = help
