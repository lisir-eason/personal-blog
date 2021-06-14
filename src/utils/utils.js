import moment from 'moment'

export const isNeedGetCurrentUserInfo = (path) => {
  if (path === '/') {
    return true
  }
  const pathList = ['/profile', '/focus', '/setting', '/edit', '/view', '/my']
  let need = false
  pathList.map(item => {
    if (path.search(item) !== -1) {
      need = true
    }
  })
  return need
}

export const formatDate = (time) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}