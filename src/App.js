import React, {useEffect} from 'react'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import {getCurrentUser} from './api/index'
import {useDispatch} from 'react-redux'
import {isNeedGetCurrentUserInfo} from './utils/utils'

import LoginModal from './component/loginModal'

import RegisterPage from './page/register/RegisterPage'
import HomePage from './page/home/HomePage'
import ProfilePage from './page/profile/ProfilePage'
import focusPage from './page/focus/focusPage'
import NotFoundPage from './page/notFound/NotFoundPage'
import SettingPage from './page/setting/SettingPage'
import EditPage from './page/edit/EditPage'
import viewPage from './page/view/viewPage'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (isNeedGetCurrentUserInfo(window.location.pathname)) {
      getCurrentUser().then(res=> {
        if (res) {
          dispatch({type: 'set_user_info', payload: res.data.data})
        }
      })
    }
  }, [])

  return (
    <BrowserRouter>
      <LoginModal />
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/profile/:userName' component={ProfilePage}></Route>
        <Route exact path='/focus' component={focusPage}></Route>
        <Route exact path='/setting' component={SettingPage}></Route>
        <Route exact path='/edit' component={EditPage}></Route>
        <Route exact path='/view/:id' component={viewPage}></Route>
        <Route exact path='/register' component={RegisterPage}></Route>
        <Route exact path='*' component={NotFoundPage}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
