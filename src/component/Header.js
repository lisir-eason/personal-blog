import {useState, useEffect} from 'react'
import {Avatar, Button, Tooltip, Space, Typography, Divider, message} from 'antd'
import { EditFilled, LogoutOutlined} from '@ant-design/icons'
import {useSelector, useDispatch} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout, createNewBlog} from '../api/index'
import './Header.less'
import userDefaultImg from '../static/user.png'


const Header = ({
  active, history
}) => {
  const userInfo = useSelector(state => state.userInfo)
  const editorInfo = useSelector(state => state.editorInfo)
  const dispatch = useDispatch()
  const {title, tags, rawContent, htmlContent, isSave} = editorInfo

  const onLogout = () => {
    logout().then(res=> {
      if (res.data.errno === 0) {
        history.push('/')
      }
    })
  }
  const postBlog = () => {
    if (!isSave) {
      message.error('请先按ctrl+s保存后再点击发布！')
      return
    }
    if (!title) {
      message.error('博客标题不能为空！')
      return
    }
    if (!tags) {
      message.error('博客标签不能为空！')
      return
    }
    if (!rawContent) {
      message.error('博客内容不能为空！')
      return
    }
    const params = {
      title, tags, rawContent, htmlContent,
    }
    createNewBlog(params).then(res => {
      message.success('发布成功！')
    })
  }

  return (
    <div className='header-container'>
      <header className="header-box">
        <div className="header-inner">
          <Avatar size="large" src={userInfo ? userInfo.picture : userDefaultImg} />
          <ul className="nav-box">
            <li className="nav-item">
              <Link to={'/home'} className={active === 'home' ? 'is-active' : ''}>首页</Link>
            </li>
            <li className="nav-item">
              <span className={active === 'focus' ? 'is-active' : ''} onClick={() => {
                if (!userInfo) {
                  dispatch({type: 'set_login_modal', payload: true})
                  return
                }
                history.push('/focus')
              }}>关注</span>
            </li>
            <li className="nav-item">
              <span className={active === 'profile' ? 'is-active' : ''} onClick={() => {
                if (!userInfo) {
                  dispatch({type: 'set_login_modal', payload: true})
                  return
                }
                history.push(`/profile/${userInfo.userName}`)
              }}>个人主页</span>
            </li>
            <li className="nav-item">
              <span className={active === 'setting' ? 'is-active' : ''} onClick={() => {
                if (!userInfo) {
                  dispatch({type: 'set_login_modal', payload: true})
                  return
                }
                history.push('/setting')
              }}>设置</span>
            </li>
          </ul>
          <Space split={<Divider type="vertical" />} className='menu-box'>
            <span className='welcome-span'>欢迎您！{userInfo ? userInfo.nickName : '游客'}</span>
            {active === 'edit' ? <Button type="primary" onClick={postBlog}>发布</Button>: null}
            <Tooltip title="去创作！">
              <EditFilled className={active === 'edit' ? 'active-icon' : ''} onClick={() => {
                if (!userInfo) {
                  dispatch({type: 'set_login_modal', payload: true})
                  return
                }
                history.push('/edit')
              }}/>
            </Tooltip>
            <Tooltip title="登出">
              <LogoutOutlined onClick={onLogout} />
            </Tooltip>
          </Space>
        </div>
      </header>
    </div>
  )
}

export default withRouter(Header)