import {useEffect, useState} from 'react'
import { useParams, useHistory} from 'react-router-dom'
import {Timeline, Statistic, Row, Col, Divider,} from 'antd'
import {getUserBlogs} from '../../api/index'
import { LikeOutlined, StarOutlined, ReadOutlined, EyeOutlined } from '@ant-design/icons'
import moment from 'moment'
import EmptyBox from '../../component/EmptyBox'
import './ProfilePage.less'


const ProfilePage = () => {
  const {userName} = useParams()
  const {push} = useHistory()
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    getUserBlogs({userName}).then(res => {
      if (res) {
        setBlogs(res.data.data)
      }
    })
  }, [userName])

  return (
    <div>
      <div className="content-container">
        {
          blogs.length ?
            <div>
              <Divider orientation="left">总览</Divider>
              <div className='profile-box'>
                <Row gutter={16}>
                  <Col span={6}>
                    <Statistic title="博客总数" value={blogs.length}
                      prefix={<ReadOutlined className='profile-icon'/>}/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="阅读" value={89}
                      prefix={<EyeOutlined className='profile-icon'/>} />
                  </Col>
                  <Col span={6}>
                    <Statistic title="点赞" value={1128}
                      prefix={<LikeOutlined className='profile-icon'/>} />
                  </Col>
                  <Col span={6}>
                    <Statistic title="收藏" value={18}
                      prefix={<StarOutlined className='profile-icon'/>} />
                  </Col>
                </Row>
              </div>
              <Divider orientation="left">所有博客</Divider>
              <div className='timeline-container'>
                <Timeline>
                  {
                    blogs.map(blog => {
                      return <Timeline.Item key={blog.id}>
                        <span className="timeline-blog-title" onClick={() => {
                          push(`/view/${blog.id}`)
                        }}>
                          {blog.title}
                        </span>
                        <span className="timeline-blog-create">
                          {moment(blog.createdAt).format('YYYY-MM-DD')}
                        </span>
                      </Timeline.Item>
                    })
                  }
                </Timeline>
              </div>
            </div> :
            <EmptyBox />
        }
      </div>
    </div>
  )
}

export default ProfilePage