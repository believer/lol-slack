var fetch = require('node-fetch')

function getData (url) {
  return fetch(url)
    .then(function(response) { return response.json() })
}

module.exports = getData
