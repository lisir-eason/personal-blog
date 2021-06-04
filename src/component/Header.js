import {useState, useEffect} from 'react'
import {Avatar, Button, Tooltip, Space, Typography, Divider} from 'antd'
import { EditFilled, LogoutOutlined} from '@ant-design/icons'
import {useSelector} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../api/index'
import './Header.less'


const Header = ({
  active, history
}) => {
  const onLogout = () => {
    logout().then(res=> {
      if (res.data.errno === 0) {
        history.push('/')
      }
    })
  }

  const userInfo = useSelector(state => state.userInfo)
  let userName = userInfo && userInfo.userName

  return (
    <div className='header-container'>
      <header className="header-box">
        <div className="header-inner">
          <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <ul className="nav-box">
            <li className="nav-item">
              <Link to={'/home'} className={active === 'home' ? 'is-active' : ''}>首页</Link>
            </li>
            <li className="nav-item">
              <Link to={'/square'} className={active === 'square' ? 'is-active' : ''}>关注</Link>
            </li>
            <li className="nav-item">
              <Link to ={`/profile/${userName}`} className={active === 'profile' ? 'is-active' : ''}>个人主页</Link>
            </li>
            <li className="nav-item">
              <Link to ={'/setting'} className={active === 'setting' ? 'is-active' : ''}>设置</Link>
            </li>
          </ul>
          <Space split={<Divider type="vertical" />} className='menu-box'>
            <Tooltip title="去创作！">
              <EditFilled />
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