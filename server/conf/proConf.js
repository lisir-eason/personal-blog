const {isDev, isProd} = require('../utils/env')

let defaultUserImg

if (isDev) {
  defaultUserImg = 'http://localhost:3001/default/user.png'
} else if (isProd) {
  defaultUserImg = 'http://www.lisireason.xyz:3001/default/user.png'
}


module.exports = {
  defaultUserImg,
}