const defaultState = {
  state: 'fine',
  register: {
    userName: '',
    password: ''
  }
}

export default (state = defaultState, action)=>{
  switch (action.type) {
  case 'set_register_info':
    state.register = {...action.payload}
    break
  case 'delete':
    state = {value: state.value - 1}
    break
  default:
    break
  }
  return state
}