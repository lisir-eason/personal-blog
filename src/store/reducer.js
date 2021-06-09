const defaultState = {
  state: 'fine',
  register: {
    userName: '',
    password: ''
  },
  userInfo: null,
  editorInfo: {
    title: '',
    tags: [],
    htmlContent: null,
    rawContent: null,
    isSave: true,
  },
  isLoginModalOpen: false,
}

export default (state = defaultState, action)=>{
  switch (action.type) {
  case 'set_register_info':
    state.register = {...action.payload}
    break
  case 'set_user_info':
    state.userInfo = {...action.payload}
    break
  case 'set_editor_info':
    state.editorInfo = {...state.editorInfo, ...action.payload}
    break
  case 'set_login_modal':
    state.isLoginModalOpen = action.payload
    break
  default:
    break
  }
  return state
}