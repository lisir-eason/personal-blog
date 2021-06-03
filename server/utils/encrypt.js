const crypto = require('crypto')


const encryptFn = (word) => {
  let md5 = crypto.createHash('md5')
  return md5.update(word).digest('hex')
}

module.exports = {
  encryptFn,
}