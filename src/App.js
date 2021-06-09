import React from 'react'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import {getCurrentUser} from './api/index'
import {useDispatch} from 'react-redux'

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


  return (
    <BrowserRouter>
      <LoginModal />
      <Switch>
        <Route exact path='/' component={RegisterPage}></Route>
        <Route exact path='/profile/:userName' component={ProfilePage}></Route>
        <Route exact path='/home' component={HomePage}></Route>
        <Route exact path='/focus' component={focusPage}></Route>
        <Route exact path='/setting' component={SettingPage}></Route>
        <Route exact path='/edit' component={EditPage}></Route>
        <Route exact path='/view/:id' component={viewPage}></Route>
        <Route exact path='*' component={NotFoundPage}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
