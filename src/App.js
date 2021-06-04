import React from 'react'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import {isLogin} from './api/index'

import RegisterPage from './page/register/RegisterPage'
import HomePage from './page/home/HomePage'
import ProfilePage from './page/profile/ProfilePage'
import SquarePage from './page/square/SquarePage'

const App = () => {
  if (window.location.pathname !== '/') {
    isLogin()
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={RegisterPage}></Route>
        <Route exact path='/profile/:userName' component={ProfilePage}></Route>
        <Route exact path='/home' component={HomePage}></Route>
        <Route exact path='/square' component={SquarePage}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
