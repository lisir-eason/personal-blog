const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')


const client = redis.createClient(REDIS_CONF)

client.on('error', function(error) {
  console.error(error)
})

//redis失效时间，设置为60秒
const set = (key, value, timeout = 60) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  client.set(key, value)
  client.expire(key, timeout)
}

const get = (key) => {
  const pr = new Promise((resolve, reject) => {
    client.get(key, function(err, value) {
      if (err) {
        reject(err)
        return
      }
      if (!value) {
        resolve(value)
        return
      }
      resolve(JSON.parse(value))
    })
  })

  return pr
}

module.exports = {
  get,
  set,
}