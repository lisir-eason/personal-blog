const {isDev, isProd} = require('../utils/env')

let defaultUserImg

if (isDev) {
  defaultUserImg = 'http://localhost:3001/default/user.png'
} else if (isProd) {
  defaultUserImg = 'http://www.lisireason.xyz:3001/default/user.png'
}


const genRandomPic = () => {
  let randomImg
  const random = Math.ceil(Math.random() * 12)

  if (isDev) {
    randomImg = `http://localhost:3001/default/${random}.png`
  } else if (isProd) {
    randomImg = `http://www.lisireason.xyz:3001/default/${random}.png`
  }

  return randomImg
}


module.exports = {
  defaultUserImg,
  genRandomPic,
}