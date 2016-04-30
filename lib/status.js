const riot = require('../services/riot')
const fetch = require('node-fetch')
const slackFormat = require('./slackFormat')

function *status (region, params) {
  if (!region) {
    return {
      response_type: 'ephemeral',
      text: 'No region provided.'
    }
  }

  const status = yield riot.status(region)

  const services = status.services.map(service => ({
    title: service.name,
    value: service.status,
    short: true
  }))

  const response = {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - Status for ${status.name}*`,
    attachments: [{
      fields: services
    }]
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(response)
  }

  fetch(params.response_url, options)

  return slackFormat(response)
}

module.exports = status
