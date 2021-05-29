import React from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'

import HomePage from './page/home/Home'
import RegisterPage from './page/register/Register'

const App = () => {

  return (
    <HashRouter>
      <Switch>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/register' component={RegisterPage}></Route>
      </Switch>
    </HashRouter>
  )
}

export default App
