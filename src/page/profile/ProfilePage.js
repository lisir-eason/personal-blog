import {useEffect, useState, Fragment} from 'react'
import { useParams, useHistory} from 'react-router-dom'
import {Timeline, Statistic, Row, Col, Divider, Skeleton,
  Descriptions, Image, Space, Tooltip, message} from 'antd'
import {useSelector} from 'react-redux'
import {getUserBlogs} from '../../api/index'
import { LikeOutlined, StarOutlined, ReadOutlined, EyeOutlined,
  GithubOutlined, QqOutlined, WechatOutlined, HeartTwoTone, SettingFilled} from '@ant-design/icons'
import moment from 'moment'
import EmptyBox from '../../component/EmptyBox'
import './ProfilePage.less'


const ProfilePage = () => {
  const {userName} = useParams()
  const {push} = useHistory()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [visitUserInfo, setVisitUserInfo] = useState()
  const userInfo = useSelector(state => state.userInfo)
  const genders = ['', '男', '女', '保密']
  useEffect(() => {
    getUserBlogs({userName}).then(res => {
      if (res) {
        setBlogs(res.data.data.blogs)
        setVisitUserInfo(res.data.data.user)
      }
      setLoading(false)
    })
  }, [userName])

  const copyText = (text) => {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.setAttribute('value', text)
    input.select()
    if (document.execCommand('copy')) {
      document.execCommand('copy')
      message.success(`号码：${text}复制成功！`)
    }
    document.body.removeChild(input)
  }

  return (
    <div>
      <div className="content-container">
        {
          !loading && blogs.length !== 0 &&
            <div>
              <Divider orientation="left">基本信息</Divider>
              <Row gutter={16} style={{padding: '15px 50px'}}>
                <Col span={6}>
                  <Image
                    width={150}
                    height={150}
                    src={visitUserInfo.picture}
                  />
                </Col>
                <Col span={18}>
                  <Descriptions>
                    <Descriptions.Item label="昵称">{visitUserInfo.nickName}</Descriptions.Item>
                    <Descriptions.Item label="城市">{visitUserInfo.city}</Descriptions.Item>
                    <Descriptions.Item label="性别">{genders[visitUserInfo.gender]}</Descriptions.Item>
                  </Descriptions>
                  <Descriptions layout="vertical">
                    <Descriptions.Item label="个性签名">
                      {
                        visitUserInfo.signature ? visitUserInfo.signature : '这个人很懒，什么也没有留下'
                      }
                    </Descriptions.Item>
                  </Descriptions>
                  <Space split={<Divider type="vertical" />} className='user-link-box'>
                    <Tooltip title="GitHub">
                      <GithubOutlined onClick={() => {
                        if (visitUserInfo.github) {
                          window.open(visitUserInfo.github)
                        } else {
                          message.error('当前用户没有设置github！')
                        }
                      }} />
                    </Tooltip>
                    <Tooltip title="QQ">
                      <QqOutlined onClick={() => {
                        if (visitUserInfo.qq) {
                          copyText(visitUserInfo.qq)
                        } else {
                          message.error('当前用户没有设置QQ！')
                        }
                      }} />
                    </Tooltip>
                    <Tooltip title="微信">
                      <WechatOutlined onClick={() => {
                        if (visitUserInfo.weChat) {
                          copyText(visitUserInfo.weChat)
                        } else {
                          message.error('当前用户没有设置微信！')
                        }
                      }}/>
                    </Tooltip>
                    {
                      userInfo && userInfo.id === visitUserInfo.id ?
                        <Tooltip title="设置">
                          <SettingFilled onClick={() => {
                            push('/setting')
                          }} />
                        </Tooltip> :
                        <Tooltip title="关注他！">
                          <HeartTwoTone twoToneColor='#ff4d4f' />
                        </Tooltip>
                    }
                    {/* <Tooltip title="取消关注">
                      <HeartTwoTone twoToneColor='#8590a6' />
                    </Tooltip> */}
                  </Space>

                </Col>
              </Row>

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
            </div>
        }
        {
          !loading && blogs.length === 0 && <EmptyBox />
        }
        {
          loading && <Fragment>
            <Skeleton active paragraph={{rows:8}}/>
          </Fragment>
        }
      </div>
    </div>
  )
}

export default ProfilePage