const fs = require('fs')
const path = require('path')
const {SuccessModal} = require('../model/resModal')

async function uploadFile(ctx, file) {
  const reader = fs.createReadStream(file.path)
  const myDate = new Date()
  const newFilename = myDate.getTime()+'.'+file.name.split('.')[1]
  const filePath = path.join(__dirname, '../public/upload/') + `${newFilename}`
  const upStream = fs.createWriteStream(filePath)

  reader.pipe(upStream)
  return new SuccessModal({data: {url: `http://${ctx.headers.host}/upload/${newFilename}`}})
}

module.exports = {
  uploadFile
}