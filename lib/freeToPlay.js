const freeToPlayService = require('../services/lol/freeToPlay')
const fetch = require('node-fetch')

function getChampions () {
  return new Promise(resolve => {
    freeToPlayService()
      .toArray(champions => resolve(champions))
  })
}

function* freeToPlay (params) {
  const champions = yield getChampions()

  const options = {
    method: 'POST',
    body: JSON.stringify({
      response_type: 'in_channel',
      mrkdwn: true,
      text: '*League of Legends - Free to play champions*',
      attachments: [{
        fields: champions
      }]
    })
  }

  // Usually takes longer than 3000 ms.
  // Send the reponse to the provided response_url
  fetch(params.response_url, options)
    .then(res => console.log(res))

  return { success: true }
}

module.exports = freeToPlay
