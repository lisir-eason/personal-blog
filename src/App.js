import React, {useEffect, Suspense, lazy} from 'react'
import {BrowserRouter, Route, Switch,} from 'react-router-dom'
import {getCurrentUser, getCurrentUserNotification} from './api/index'
import {useDispatch} from 'react-redux'
import {isNeedGetCurrentUserInfo} from './utils/utils'
import {Spin} from 'antd'

import LoginModal from './component/loginModal'
import Header from './component/Header'

const RegisterPage = lazy(() => import('./page/register/RegisterPage'))
const HomePage = lazy(() => import('./page/home/HomePage'))
const ProfilePage = lazy(() => import('./page/profile/ProfilePage'))
const focusPage = lazy(() => import('./page/focus/focusPage'))
const NotFoundPage = lazy(() => import('./page/notFound/NotFoundPage'))
const SettingPage = lazy(() => import('./page/setting/SettingPage'))
const EditPage = lazy(() => import('./page/edit/EditPage'))
const viewPage = lazy(() => import('./page/view/viewPage'))
const MyPage = lazy(() => import('./page/my/MyPage'))

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (isNeedGetCurrentUserInfo(window.location.pathname)) {
      getCurrentUser().then(res=> {
        if (res && res.data) {
          dispatch({type: 'set_user_info', payload: res.data.data})
          getCurrentUserNotification().then(result => {
            if (result && result.data) {
              dispatch({type: 'set_notification_info', payload: result.data.data})
            }
          })
        }
      })
    }
  }, [])


  return (
    <BrowserRouter>
      <LoginModal />
      <Header />
      <Suspense
        fallback={<div className="loading-container"><Spin tip='玩命加载中...'/></div>}
      >
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path='/profile/:userName' component={ProfilePage}></Route>
          <Route exact path='/focus' component={focusPage}></Route>
          <Route exact path='/setting' component={SettingPage}></Route>
          <Route exact path='/my' component={MyPage}></Route>
          <Route exact path='/edit/:id' component={EditPage}></Route>
          <Route exact path='/view/:id' component={viewPage}></Route>
          <Route exact path='/register' component={RegisterPage}></Route>
          <Route exact path='*' component={NotFoundPage}></Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}


export default App
