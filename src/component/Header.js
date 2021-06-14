import {useState, useEffect} from 'react'
import {Avatar, Button, Tooltip, Space, Typography, Divider, message} from 'antd'
import { EditFilled, LogoutOutlined} from '@ant-design/icons'
import {useSelector, useDispatch} from 'react-redux'
import {Link, withRouter, useLocation,} from 'react-router-dom'
import {logout, createNewBlog, updateBlogById} from '../api/index'
import './Header.less'
import userDefaultImg from '../static/user.png'


const Header = ({
  history,
}) => {
  const userInfo = useSelector(state => state.userInfo)
  const editorInfo = useSelector(state => state.editorInfo)
  const dispatch = useDispatch()
  const {id, title, tags, rawContent, htmlContent, isSave} = editorInfo
  const {pathname} = useLocation()

  const onLogout = () => {
    logout().then(res=> {
      if (res.data.errno === 0) {
        history.push('/register')
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
    if (!tags.length) {
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
    if (id === 'new') {
      createNewBlog(params).then(res => {
        if (res && res.data) {
          message.success('发布成功！')
          dispatch({type: 'reset_editor_info'})
          history.push(`/view/${res.data.data.id}`)
        }

      })
    } else {
      params.id = parseInt(id, 10)
      updateBlogById(params).then(res => {
        if (res && res.data) {
          message.success('更新成功！')
          dispatch({type: 'reset_editor_info'})
          history.push(`/view/${id}`)
        }
      })
    }
  }

  return (
    <div className='header-container'>
      <header className="header-box">
        <div className="header-inner">
          <Tooltip title={userInfo ? userInfo.nickName : '游客'}>
            <Avatar size="large" src={userInfo ? userInfo.picture : userDefaultImg} />
          </Tooltip>
          <ul className="nav-box">
            <li className="nav-item">
              <Link to={'/'} className={pathname === '/' ? 'is-active' : ''}>首页</Link>
            </li>
            <li className="nav-item">
              <span className={pathname === '/focus' ? 'is-active' : ''} onClick={() => {
                if (!userInfo) {
                  dispatch({type: 'set_login_modal', payload: true})
                  return
                }
                history.push('/focus')
              }}>关注</span>
            </li>
            <li className="nav-item">
              <span className={pathname.search('profile') !== -1 ? 'is-active' : ''} onClick={() => {
                if (!userInfo) {
                  dispatch({type: 'set_login_modal', payload: true})
                  return
                }
                history.push(`/profile/${userInfo.userName}`)
              }}>个人主页</span>
            </li>
            <li className="nav-item">
              <span className={pathname === '/my' ? 'is-active' : ''} onClick={() => {
                if (!userInfo) {
                  dispatch({type: 'set_login_modal', payload: true})
                  return
                }
                history.push('/my')
              }}>我的</span>
            </li>
            <li className="nav-item">
              <span className={pathname === '/setting' ? 'is-active' : ''} onClick={() => {
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
            {pathname.search('edit') !== -1 ? <Button type="primary" onClick={postBlog}>发布</Button>: null}
            <Tooltip title="去创作！">
              <EditFilled className={pathname.search('edit') !== -1 ? 'active-icon' : ''} onClick={() => {
                if (!userInfo) {
                  dispatch({type: 'set_login_modal', payload: true})
                  return
                }
                history.push('/edit/new')
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