const {isDev, isProd} = require('../utils/env')

const genRandomPic = () => {
  let randomImg
  const random = Math.ceil(Math.random() * 12)

  if (isDev) {
    randomImg = `http://localhost:3001/default/${random}.png`
  } else if (isProd) {
    randomImg = `/pictures/default/${random}.png`
  }

  return randomImg
}


module.exports = {
  genRandomPic,
}