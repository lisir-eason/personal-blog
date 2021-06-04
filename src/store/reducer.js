const defaultState = {
  state: 'fine',
  register: {
    userName: '',
    password: ''
  },
  userInfo: null,
}

export default (state = defaultState, action)=>{
  switch (action.type) {
  case 'set_register_info':
    state.register = {...action.payload}
    break
  case 'set_user_info':
    state.userInfo = {...action.payload}
    break
  default:
    break
  }
  return state
}