import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Form, Input, Button, Checkbox, message } from 'antd'
import url from 'fast-url-parser'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {withRouter} from 'react-router-dom'
import {login} from '../../api/index'

const LoginForm = ({
  setIsLogin, history, isModal,
}) => {
  const [remember, setRemember] = useState(true)
  const register = useSelector(state => state.register)
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue(register)
  }, [register])
  const onForgetPasswordClick = (e) => {
    e.preventDefault()
    message.error('还没有实现该功能！')
  }

  const onNoLoginClick = (e) => {
    e.preventDefault()
    dispatch({type: 'set_login_modal', payload: false})
  }

  const onFinish = (values) => {
    const {userName, password,} = values
    const params = {
      userName,
      password
    }
    login(params).then(res => {
      if (res && res.data.errno === 0) {
        dispatch({type: 'set_user_info', payload: res.data.data})
        if (isModal) {
          dispatch({type: 'set_login_modal', payload: false})
          return
        }
        const parsed = url.parse(window.location.href, true)
        if (parsed.query.url) {
          history.push({pathname: parsed.query.url})
          return
        }
        history.push({pathname: '/'})
      } else {
        message.error(res.data.message)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <Form
      name='login-form'
      className="login-form login-form-before"
      validateTrigger='onBlur'
      initialValues={register}
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name='userName'
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
        />
      </Form.Item>
      <Form.Item
        name='password'
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
        <Form.Item noStyle>
          <Checkbox checked={remember} onChange={e => setRemember(e.target.checked)}>记住我</Checkbox>
        </Form.Item>
        {
          isModal?
            <a className="login-form-forgot" href="" onClick={onNoLoginClick}>
              暂不登录
            </a>:
            <a className="login-form-forgot" href="" onClick={onForgetPasswordClick}>
              忘记密码
            </a>
        }
      </Form.Item>

      <Form.Item>
        <Button type="primary" className="login-form-button" htmlType="submit">
          登录
        </Button>
        或者 <Button type="link" className="register-btn" onClick={() => setIsLogin(false)}>去注册!</Button>
      </Form.Item>
    </Form>
  )
}

export default withRouter(LoginForm)