const _ = require('lodash')

const text = '*League of Legends*'+
  '\n==============================================\n' +
  '*Commands:*\n\n' +
  '`/lol freeToPlay <summonerName>`\n' +
  'Displays the current champions that are free to play\n' +
  '`/lol latest <summonerName>`\n' +
  'Displays the latest match\n' +
  '`/lol status <regionSlug>`\n' +
  'Displays the status of the servers.\n' +
  'Region slug is EUNE, EUW, NA and so on.\n' +
  '`/lol team <summonerName>`\n' +
  'Displays the teams of a summoner\n' +
  '`/lol topThreeChamps <summonerName>`\n' +
  'Displays the top three champions played\n' +
  '`/lol wins <summonerName>`\n' +
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

  const responseWithoutType = _.omit(response, 'response_type')

  console.log(encodeURI(JSON.stringify(responseWithoutType)))

  return response
}

module.exports = help
