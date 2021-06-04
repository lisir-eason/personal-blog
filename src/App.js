import React from 'react'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import {getCurrentUser} from './api/index'
import {useDispatch} from 'react-redux'

import RegisterPage from './page/register/RegisterPage'
import HomePage from './page/home/HomePage'
import ProfilePage from './page/profile/ProfilePage'
import SquarePage from './page/square/SquarePage'
import NotFoundPage from './page/notFound/NotFoundPage'
import SettingPage from './page/setting/SettingPage'

const App = () => {
  const dispatch = useDispatch()
  if (window.location.pathname !== '/') {
    getCurrentUser().then(res=> {
      dispatch({type: 'set_user_info', payload: res.data.data})
    })
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={RegisterPage}></Route>
        <Route exact path='/profile/:userName' component={ProfilePage}></Route>
        <Route exact path='/home' component={HomePage}></Route>
        <Route exact path='/square' component={SquarePage}></Route>
        <Route exact path='/setting' component={SettingPage}></Route>
        <Route exact path='*' component={NotFoundPage}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
