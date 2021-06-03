import {useState} from 'react'
import { useDispatch} from 'react-redux'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import {register, isUserExit} from '../../api/index'

const RegisterForm = ({
  setIsLogin
}) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const dispatch = useDispatch()

  const handelRegister = () => {
    const params = {
      userName,
      password
    }
    if (password !== rePassword) {
      message.error('两次输入的密码不一致！')
      return
    }
    register(params).then(res => {
      if (res.data.errno === 0) {
        message.success('注册成功！')
        setIsLogin(true)
        dispatch({
          type: 'set_register_info',
          payload: params
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Form
      name="normal_login"
      className="login-form login-form-right"
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
          {
            validator: (_, value) => {
              if (value) {
                const params = {userName: value}
                return isUserExit(params)
                  .then(res => {
                    if (res.data.data) {
                      return Promise.reject(new Error('用户名已存在！'))
                    }
                    return Promise.resolve()
                  })
              }
              return Promise.resolve()
            }
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名"
          onChange={(e) => {
            setUserName(e.target.value)
          }}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密  码"
          onChange={e => {
            setPassword(e.target.value)
          }}
        />
      </Form.Item>
      <Form.Item
        name="rePassword"
        rules={[
          {
            required: true,
            message: '请确认密码!',
          },
        ]}
        onChange={e => {
          setRePassword(e.target.value)
        }}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="确认密码"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" className="login-form-button" onClick={handelRegister}>
          注册
        </Button>
        已有账号? <Button type="link" className="register-btn" onClick={() => setIsLogin(true)}>去登录!</Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterForm