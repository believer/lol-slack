const riot = require('../services/lol/riot')

function *status (region) {
  const status = yield riot.status(region)

  const services = status.services.map(service => ({
    title: service.name,
    value: service.status,
    short: true
  }))

  return {
    response_type: 'in_channel',
    mrkdwn: true,
    text: `*League of Legends - Status for ${status.name}*`,
    attachments: [{
      fields: services
    }]
  }
}

module.exports = status
