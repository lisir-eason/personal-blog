const fs = require('fs')
const path = require('path')
const {SuccessModal} = require('../model/resModal')
const {isDev, isProd} = require('../utils/env')

async function uploadFile(ctx, file) {
  const reader = fs.createReadStream(file.path)
  const myDate = new Date()
  const newFilename = myDate.getTime()+'.'+file.name.split('.')[1]
  const filePath = path.join(__dirname, '../public/upload/') + `${newFilename}`
  const upStream = fs.createWriteStream(filePath)
  let picBaseUrl

  reader.pipe(upStream)

  if (isDev) {
    picBaseUrl = 'http://localhost:3001'
  } else if (isProd) {
    picBaseUrl = '/pictures'
  }

  return new SuccessModal({data: {url: `${picBaseUrl}/upload/${newFilename}`}})
}

module.exports = {
  uploadFile
}