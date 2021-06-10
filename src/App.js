import React, {useEffect, Suspense, lazy} from 'react'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import {getCurrentUser} from './api/index'
import {useDispatch} from 'react-redux'
import {isNeedGetCurrentUserInfo} from './utils/utils'
import {Spin} from 'antd'

import LoginModal from './component/loginModal'

const RegisterPage = lazy(() => import('./page/register/RegisterPage'))
const HomePage = lazy(() => import('./page/home/HomePage'))
const ProfilePage = lazy(() => import('./page/profile/ProfilePage'))
const focusPage = lazy(() => import('./page/focus/focusPage'))
const NotFoundPage = lazy(() => import('./page/notFound/NotFoundPage'))
const SettingPage = lazy(() => import('./page/setting/SettingPage'))
const EditPage = lazy(() => import('./page/edit/EditPage'))
const viewPage = lazy(() => import('./page/view/viewPage'))

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
      <Suspense fallback={<div className="loading-container">
        <Spin tip='带宽只有1M,玩命加载中...'/>
      </div>}>
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
      </Suspense>
    </BrowserRouter>
  )
}


export default App
