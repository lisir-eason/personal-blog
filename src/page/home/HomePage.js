import React from 'react'
import { DatePicker } from 'antd'
import './HomePage.less'

import Header from '../../component/Header'


const HomePage = () => {

  return (
    <React.Fragment>
      <Header active="home" />
      <div className='content-container'>
        homepage
      </div>
    </React.Fragment>
  )
}

export default HomePage