import { Result, Button } from 'antd'
import {withRouter} from 'react-router-dom'


const NotFoundPage = ({
  history
}) => {
  return (
    <div>
      <div className='content-container'>
        <Result
          status="404"
          title="404"
          subTitle="抱歉，你访问的页面不存在。"
          extra={<Button type="primary"
            onClick={() => {
              history.push('/')
            }}>回到主页</Button>}
        />
      </div>
    </div>
  )
}

export default withRouter(NotFoundPage)