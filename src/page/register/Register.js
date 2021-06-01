import React from 'react'
import { DatePicker } from 'antd'
import './Register.less'

class RegisterPage extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return <React.Fragment>
      <div className='test'>
        <h1 className="animate__fadeIn">注册页面 是的哦</h1>
        <DatePicker></DatePicker>
      </div>
    </React.Fragment>
  }
}

export default RegisterPage