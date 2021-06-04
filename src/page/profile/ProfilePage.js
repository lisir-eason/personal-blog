import {withRouter} from 'react-router-dom'

import Header from '../../component/Header'


const ProfilePage = ({
  match
}) => {
  return (
    <div>
      <Header active="profile" />
      <div className="content-container">
        {match.params.userName}
      </div>
    </div>
  )
}

export default withRouter(ProfilePage)