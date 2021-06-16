import { useState, useEffect, Fragment } from 'react'
import { Collapse, Modal, Input, Button, message,
  Tabs, Badge, List, Avatar,} from 'antd'
import { CaretRightOutlined, EditOutlined,
  ExclamationCircleOutlined, DeleteTwoTone
} from '@ant-design/icons'
import {Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getUserCollections, getCurrentUserCollectBlogs, updateCollection,
  deleteCollection, deleteCollectBlog, readNotification, getCurrentUserNotification,
} from '../../api/index'
import {formatDate} from '../../utils/utils'
import EmptyBox from '../../component/EmptyBox'
import systemImg from '../../static/system.png'
import './My.less'

const MyPage = () => {
  const { Panel } = Collapse
  const { confirm } = Modal
  const { TabPane } = Tabs
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.userInfo)
  const notification = useSelector(state => state.notification)
  const [currentUserCollections, setCurrentUserCollections] = useState([])
  const [currentEditCollection, setCurrentEditCollection] = useState()
  const [newName, setNewName] = useState('')
  const {push} = useHistory()

  const getCollectBlogsForUser = () => {
    getUserCollections({userId: userInfo.id}).then(res => {
      if (res && res.data) {
        let {data} = res.data
        data = data.map(item => {
          item['blogs'] = []
          return item
        })
        getCurrentUserCollectBlogs().then(result => {
          if (result && result.data) {
            const collectBlogs = result.data.data
            data.map(element => {
              collectBlogs.map(item => {
                if (element.id === item.collectionId) {
                  element.blogs.push(item)
                }
              })
              return element
            })
            setCurrentUserCollections(data)
          }
        })
      }
    })
  }

  const getNotification = () => {
    getCurrentUserNotification().then(result => {
      if (result && result.data) {
        dispatch({type: 'set_notification_info', payload: result.data.data})
      }
    })
  }

  useEffect(() => {
    if (userInfo) {
      getCollectBlogsForUser()
    }

  }, [userInfo])

  const editCollection = (e, item) => {
    e.stopPropagation()
    setCurrentEditCollection(item)
    setNewName(item.collectionName)
    setVisible(true)
  }

  const handleOk = () => {
    if (newName === currentEditCollection.collectionName) {
      message.error('文件夹名没有改变！')
      return
    }
    const params = {
      collectId: currentEditCollection.id,
      collectionName: newName
    }
    setConfirmLoading(true)
    updateCollection(params).then(res => {
      if (res && res.data) {
        getCollectBlogsForUser()
        setConfirmLoading(false)
        setVisible(false)
      }
    })
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleDelete = () => {
    deleteCollection({collectId: currentEditCollection.id}).then(res => {
      if (res && res.data) {
        message.success('文件夹删除成功！')
        getCollectBlogsForUser()
        setVisible(false)
      }
    })
  }

  const showDeleteConfirm = () =>{
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: `您确定删除“ ${currentEditCollection.collectionName} ”及其文件夹里的博客吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        handleDelete()
      },
      onCancel() {},
    })
  }

  const showDeleteCollectConfirm = (ele) => {
    confirm({
      title: '删除',
      icon: <ExclamationCircleOutlined />,
      content: `您确定删除“ ${ele.BlogTitle} ”吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteCollectBlog({collectId: ele.id}).then(res => {
          if (res && res.data) {
            message.success('删除成功！')
            getCollectBlogsForUser()
          }
        })
      },
      onCancel() {},
    })
  }

  const ignoreNotification = (id) => {
    readNotification({id}).then(res => {
      if (res && res.data) {
        getNotification()
      }
    })
  }

  return (
    <div>
      <div className="content-container">
        <Tabs defaultActiveKey="1" size="large">
          <TabPane tab={<Fragment>消息{notification.length !== 0 && <Badge dot/>}</Fragment>} key="1">
            {
              notification.length !== 0 ?
                <List
                  itemLayout="horizontal"
                  dataSource={notification}
                  renderItem={item => {
                    return <List.Item actions={[<a key="list-ignore-more" onClick={() => {
                      ignoreNotification(item.id)
                    }}>忽略</a>]}>
                      {
                        item.type === 1 &&
                          <List.Item.Meta
                            avatar={
                              <Avatar src={systemImg} />
                            }
                            title='系统通知'
                            description={item.content}
                          />
                      }
                      {
                        item.type === 2 &&
                          <List.Item.Meta
                            avatar={
                              <Avatar src={item.User.picture} />
                            }
                            title={
                              <Fragment>
                                <span className='notification-title' onClick={() => {
                                  push(`/profile/${item.User.userName}`)
                                }}>{item.User.nickName}</span>
                                  在你的博客
                                <span className='notification-title' onClick={() => {
                                  push(`/view/${item.Blog.id}#comment`)
                                }}>{item.Blog.title}</span>
                                  中评论道：
                              </Fragment>
                            }
                            description={item.content}
                          />
                      }
                      {
                        item.type === 3 &&
                        <List.Item.Meta
                          avatar={
                            <Avatar src={item.User.picture} />
                          }
                          title={
                            <Fragment>
                              <span className='notification-title' onClick={() => {
                                push(`/profile/${item.User.userName}`)
                              }}>{item.User.nickName}</span>
                                在博客
                              <span className='notification-title' onClick={() => {
                                push(`/view/${item.Blog.id}#comment`)
                              }}>{item.Blog.title}</span>
                                中回复道：
                            </Fragment>
                          }
                          description={item.content}
                        />
                      }
                    </List.Item>
                  }}
                /> :
                <EmptyBox />
            }
          </TabPane>
          <TabPane tab='收藏夹' key="2">
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              className="site-collapse-custom-collapse"
            >
              {
                currentUserCollections.map(item => {
                  return <Panel header={`${item.collectionName}（${item.blogs.length}）`} key={item.id} className="site-collapse-custom-panel"
                    extra={<EditOutlined onClick={(e) => {
                      editCollection(e, item)
                    }} />}>
                    <div className='collection-box'>
                      {
                        item.blogs.map(ele => {
                          return <div className='collection-item' key={`${item.id}--${ele.blogId}`}>
                            <Link to={`/view/${ele.blogId}`}>{ele.BlogTitle}</Link>
                            <span className="collect-data">{formatDate(ele.createdAt)}</span>
                            <DeleteTwoTone twoToneColor='#ff4d4f' onClick={() => {
                              showDeleteCollectConfirm(ele)
                            }}/>
                          </div>
                        })
                      }
                      {
                        !item.blogs.length && <div className='collection-empty-item'>空文件夹...</div>
                      }
                    </div>
                  </Panel>
                })
              }
            </Collapse>
          </TabPane>
        </Tabs>
        <Modal
          title={currentEditCollection && currentEditCollection.collectionName}
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              取消
            </Button>,
            <Button key="delete" type="primary" danger loading={confirmLoading} onClick={showDeleteConfirm}>
              删除
            </Button>,
            <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
              确认
            </Button>,
          ]}
        >
          <Input
            addonBefore="文件夹名："
            placeholder="请输入文件夹名"
            value={newName}
            onChange={e=> {
              setNewName(e.target.value)
            }}
          />
        </Modal>
      </div>
    </div>
  )
}

export default MyPage