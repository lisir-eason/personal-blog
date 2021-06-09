import {Modal} from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import LoginForm from '../page/register/LoginForm'
import RegisterForm from '../page/register/RegisterForm'


const LoginModal = () => {

  const [isLogin, setIsLogin] = useState(true)
  const isLoginModalOpen = useSelector(state => state.isLoginModalOpen)

  return (
    <Modal title="请先登录！" visible={isLoginModalOpen} footer={null} width={300} closable={false} centered>
      <div className={ isLogin ? 'login-modal-form-box' : 'login-modal-form-box turn-form-box-left'}>
        <h2>请先登录！</h2>
        <LoginForm isModal setIsLogin={setIsLogin} />
        <RegisterForm setIsLogin={setIsLogin} />
      </div>
    </Modal>
  )
}

export default LoginModal