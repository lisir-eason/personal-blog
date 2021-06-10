import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import Header from '../../component/Header'

const focusPage = () => {
  const dispatch = useDispatch()


  return (
    <div>
      <Header active="focus" />
      <div className="content-container">
        focusPage
      </div>
    </div>
  )
}

export default focusPage