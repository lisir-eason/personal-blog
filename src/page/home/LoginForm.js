import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const LoginForm = ({
  setIsLogin,
}) => {

  const [remember, setRemember] = useState(true)
  const register = useSelector(state => state.register)

  const onForgetPasswordClick = (e) => {
    e.preventDefault()
    message.error('还没有实现该功能！')
  }
  const onLogin = () => {
    //TODO: 当记住我的时候把cookie存到浏览器
  }

  return (
    <Form
      name="normal_login"
      className="login-form login-form-before"
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
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
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" noStyle>
          <Checkbox checked={remember} onChange={e => setRemember(e.target.checked)}>记住我</Checkbox>
        </Form.Item>
        <a className="login-form-forgot" href="" onClick={onForgetPasswordClick}>
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" className="login-form-button" onClick={onLogin}>
          登录
        </Button>
        或者 <Button type="link" className="register-btn" onClick={() => setIsLogin(false)}>去注册!</Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm