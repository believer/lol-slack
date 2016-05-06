const BASE = process.env.LOL_BASE
const KEY = process.env.RIOT_API_KEY

function prepUrl (url, region, base, options) {
  region = region || 'eune'
  base = base || BASE
  options = options || ''

  base = base.replace('{region}', region)
  return `${base}${url}?api_key=${KEY}${options}`
}

module.exports = prepUrl
