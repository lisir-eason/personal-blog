const {get, set} = require('./_redis')
const {getHomeBlog} = require('../services/blog')

const KEY_PREFIX = 'personal:blog'


const getHomePageBlogs = async ({page, perPage}) => {
  //personal:blog-1-10
  const keyPrefix = `${KEY_PREFIX}-${page}-${perPage}`
  const cache = await get(keyPrefix)

  if (cache) {
    return cache
  }

  const db = await getHomeBlog({page, perPage})
  set(keyPrefix, db)
  return db
}

module.exports = {
  getHomePageBlogs,
}