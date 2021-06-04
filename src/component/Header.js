import {useState, useEffect} from 'react'
import {Avatar, Button, Tooltip} from 'antd'
import { EditFilled, LogoutOutlined} from '@ant-design/icons'
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

  return (
    <div>
      <header className="header-box">
        <div className="header-inner">
          <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <ul className="nav-box">
            <li className="nav-item">
              <Link to={'/home'} className={active === 'home' ? 'is-active' : ''}>首页</Link>
            </li>
            <li className="nav-item">
              <Link to={'/square'} className={active === 'square' ? 'is-active' : ''}>广场</Link>
            </li>
            <li className="nav-item">
              <Link to ={'/profile/low'} className={active === 'profile' ? 'is-active' : ''}>我的</Link>
            </li>
          </ul>
          <Tooltip title="去创作！">
            <EditFilled className="edit-icon" />
          </Tooltip>
          <Tooltip title="登出">
            <LogoutOutlined className='logout-icon' onClick={onLogout} />
          </Tooltip>
        </div>
      </header>
    </div>
  )
}

export default withRouter(Header)