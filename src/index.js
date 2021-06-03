import React from 'react'
import ReactDOM from 'react-dom'
import LwFirewords from 'lw_firewords'
import 'antd/dist/antd.css'
import 'animate.css'
import './rewriteAntd.less'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './store/index'
import {Provider} from 'react-redux'

const lwf = new LwFirewords()
lwf.init()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
