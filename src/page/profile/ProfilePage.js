import {useEffect, useState, Fragment} from 'react'
import { useParams, useHistory} from 'react-router-dom'
import {Timeline, Statistic, Row, Col, Divider, Skeleton,
  Descriptions, Image, Space, Tooltip, message, Avatar} from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import {getUserBlogs} from '../../api/index'
import { LikeOutlined, StarOutlined, ReadOutlined, EyeOutlined,
  GithubOutlined, QqOutlined, WechatOutlined, HeartTwoTone, SettingFilled} from '@ant-design/icons'
import moment from 'moment'
import EmptyBox from '../../component/EmptyBox'
import {followUser, getUserFollower, unFollowUser,} from '../../api/index'
import './ProfilePage.less'

const ProfilePage = () => {
  const {userName} = useParams()
  const {push} = useHistory()
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState()
  const [loading, setLoading] = useState(true)
  const [visitUserInfo, setVisitUserInfo] = useState()
  const [visitUserFollower, setVisitUserFollower] = useState([])
  const userInfo = useSelector(state => state.userInfo)
  const genders = ['', '男', '女', '保密']


  const getVisitUserFollower = (params) => {
    getUserFollower(params).then(result => {
      if (result && result.data) {
        setVisitUserFollower(result.data.data)
      }
    })
  }

  useEffect(() => {
    getUserBlogs({userName}).then(res => {
      if (res) {
        setBlogs(res.data.data.blogs)
        setVisitUserInfo(res.data.data.user)
        const params = {
          userName: res.data.data.user.userName
        }
        getVisitUserFollower(params)
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

  const isCurrentUserFollow = (currentUserName) => {
    let flag = false
    visitUserFollower.map(item => {
      if (item.userName === currentUserName) {
        flag = true
      }
    })
    return flag
  }

  const followHe = (userId) => {
    if (!userInfo) {
      dispatch({type: 'set_login_modal', payload: true})
      return
    }

    const params = {
      userId
    }
    followUser(params).then(res=> {
      if (res && res.data) {
        message.success('关注成功！')
        getVisitUserFollower({userName: visitUserInfo.userName})
      }
    })
  }

  const unFollowHe = (userId) => {
    const params = {
      userId
    }
    unFollowUser(params).then(res=> {
      if (res && res.data) {
        message.success('取消关注成功！')
        getVisitUserFollower({userName: visitUserInfo.userName})
      }
    })
  }

  const calculateViewCount = (blogList) =>{
    return blogList.reduce((pre, cur) => {
      return pre + cur.viewCount
    }, 0)
  }

  return (
    <div>
      <div className="content-container">
        <Divider orientation="left">基本信息</Divider>
        <Row gutter={16} style={{padding: '15px 50px'}}>
          <Col span={6}>
            {
              visitUserInfo ?
                <Image
                  width={150}
                  height={150}
                  src={visitUserInfo.picture}
                /> :
                <Skeleton.Avatar active size={150} shape='square' />
            }

          </Col>
          <Col span={18}>
            {
              visitUserInfo ?
                <Fragment>
                  <Descriptions>
                    <Descriptions.Item label="昵称">{visitUserInfo.nickName}</Descriptions.Item>
                    <Descriptions.Item label="城市">{visitUserInfo.city}</Descriptions.Item>
                    <Descriptions.Item label="性别">{genders[visitUserInfo.gender]}</Descriptions.Item>
                    <Descriptions.Item label="个性签名">
                      {
                        visitUserInfo.signature ? visitUserInfo.signature : '这个人很懒，什么也没有留下'
                      }
                    </Descriptions.Item>
                  </Descriptions>
                  <Descriptions>
                    <Descriptions.Item className="follow-list" label="谁关注了他" labelStyle={{lineHeight: '32px'}}>
                      <Avatar.Group
                        maxCount={20}>
                        {
                          visitUserFollower.map(item => {
                            return <Tooltip title={item.nickName} placement="top" key={item.userName}>
                              <Avatar src={item.picture} onClick={() => {
                                push(`/profile/${item.userName}`)
                              }}/>
                            </Tooltip>
                          })
                        }
                      </Avatar.Group>
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
                        <Fragment>
                          {
                            userInfo && isCurrentUserFollow(userInfo.userName) ?
                              <Tooltip title="取消关注">
                                <HeartTwoTone twoToneColor='#8590a6' onClick={() => {
                                  unFollowHe(visitUserInfo.id)
                                }}/>
                              </Tooltip>:
                              <Tooltip title="关注他！">
                                <HeartTwoTone twoToneColor='#ff4d4f' onClick={() => {
                                  followHe(visitUserInfo.id)
                                }}/>
                              </Tooltip>
                          }
                        </Fragment>
                    }
                  </Space>
                </Fragment> :
                <Skeleton active />
            }
          </Col>
        </Row>
        <Divider orientation="left">总览</Divider>
        <div className='profile-box'>
          <Row gutter={16}>
            {
              blogs ?
                <Fragment>
                  <Col span={6}>
                    <Statistic title="博客总数" value={blogs.length}
                      prefix={<ReadOutlined className='profile-icon'/>}/>
                  </Col>
                  <Col span={6}>
                    <Statistic title="阅读" value={calculateViewCount(blogs)}
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
                </Fragment> :
                <Skeleton active paragraph={{rows:1}} />
            }
          </Row>
        </div>
        <Divider orientation="left">所有博客</Divider>
        <div className='timeline-container'>
          {
            !loading && blogs.length !== 0 &&
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
    </div>
  )
}

export default ProfilePage