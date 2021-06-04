import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Form, Input, Button, Checkbox, message } from 'antd'
import url from 'fast-url-parser'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {withRouter} from 'react-router-dom'
import {login} from '../../api/index'

const LoginForm = ({
  setIsLogin, history,
}) => {
  const [remember, setRemember] = useState(true)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const register = useSelector(state => state.register)
  const dispatch = useDispatch()


  useEffect(() => {
    setUserName(register.userName)
    setPassword(register.password)
    return () => {}
  }, [register])
  const onForgetPasswordClick = (e) => {
    e.preventDefault()
    message.error('还没有实现该功能！')
  }
  const onLogin = () => {
    const params = {
      userName,
      password
    }
    login(params).then(res => {
      dispatch({type: 'set_user_info', payload: res.data.data})
      const parsed = url.parse(window.location.href, true)
      if (parsed.query.url) {
        history.push({pathname: parsed.query.url})
        return
      }
      history.push({pathname: `/profile/${userName}`})
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Form
      className="login-form login-form-before"
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon"/>}
          placeholder="用户名"
          onChange={(e) => {
            setUserName(e.target.value)
          }}
          value={userName}/>
      </Form.Item>
      <Form.Item
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
          onChange={e=> {
            setPassword(e.target.value)
          }}
          value={password}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item noStyle>
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

export default withRouter(LoginForm)