import React from 'react'
import { DatePicker } from 'antd'
import './HomePage.less'

import Header from '../../component/Header'


const HomePage = () => {

  return (
    <React.Fragment>
      <Header active="home" />
      <div className='content-container'>
        <h1 className="animate__fadeIn">首页哦</h1>
      </div>
    </React.Fragment>
  )
}

export default HomePage