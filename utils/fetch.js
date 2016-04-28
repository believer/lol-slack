const fetch = require('node-fetch')

function getData (url) {
  return fetch(url)
    .then(response => {
      if (response.status === 503) {
        throw new Error(response.statusText)
      }

      return response.json()
    })
}

module.exports = getData
