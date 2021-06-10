export const isNeedGetCurrentUserInfo = (path) => {
  if (path === '/') {
    return true
  }
  const pathList = ['/profile', '/focus', '/setting', '/edit','/view']
  let need = false
  pathList.map(item => {
    if (path.search(item) !== -1) {
      need = true
    }
  })
  return need
}