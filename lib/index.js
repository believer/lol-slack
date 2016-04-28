const freeToPlay = require('./freeToPlay')
const help = require('./help')
const latest = require('./latestGame')
const status = require('./status')
const team = require('./team')
const topThreeChamps = require('./topThreeChamps')
const wins = require('./wins')

/**
 * All routes respond on the provided response_url in the
 * request body, just in case the request takes longer than
 * the maximum allowed wait time of 3000 ms in Slack.
 */
function *index () {
  const params = this.request.body
  const args = params.text.split(' ')
  const command = args[0]
  const summoner = args[1]
  const region = args[1]

  switch (command) {
    case 'freeToPlay':
      this.body = yield freeToPlay(params)
      break
    case 'latest':
      this.body = yield latest(summoner, params)
      break
    case 'status':
      this.body = yield status(region, params)
      break
    case 'team':
      this.body = yield team(summoner, params)
      break
    case 'topThreeChamps':
      this.body = yield topThreeChamps(summoner, params)
      break
    case 'wins':
      this.body = yield wins(summoner, params)
      break
    case 'help':
    default:
      this.body = help()
      break
  }
}

module.exports = index
