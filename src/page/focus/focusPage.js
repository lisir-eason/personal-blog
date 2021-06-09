import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import Header from '../../component/Header'
import { getCurrentUser} from '../../api/index'

const focusPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser().then(res=> {
      dispatch({type: 'set_user_info', payload: res.data.data})
    })
  }, [])

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