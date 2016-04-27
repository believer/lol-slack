const freeToPlay = require('./freeToPlay')
const help = require('./help')
const latest = require('./latestGame')
const status = require('./status')
const team = require('./team')
const topThreeChamps = require('./topThreeChamps')
const wins = require('./wins')

function *index () {
  const args = this.request.body.text.split(' ')
  const command = args[0]
  const summoner = args[1]
  const region = args[1]

  switch (command) {
    case 'freeToPlay':
      this.body = yield freeToPlay(this.request.body)
      break
    case 'latest':
      this.body = yield latest(summoner)
      break
    case 'status':
      this.body = yield status(region)
      break
    case 'team':
      this.body = yield team(summoner, this.request.body)
      break
    case 'topThreeChamps':
      this.body = yield topThreeChamps(summoner, this.request.body)
      break
    case 'wins':
      this.body = yield wins(summoner)
      break
    case 'help':
    default:
      this.body = help()
      break
  }
}

module.exports = index
