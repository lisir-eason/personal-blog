import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import './RegisterPage.less'


const RegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="bg-box">
      <div className={ isLogin ? 'login-form-box' : 'login-form-box turn-form-box-left'}>
        <LoginForm setIsLogin={setIsLogin} />
        <RegisterForm setIsLogin={setIsLogin} />
      </div>
    </div>
  )
}

export default RegisterPage
