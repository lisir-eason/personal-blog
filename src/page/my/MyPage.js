import { useState, useEffect } from 'react'
import { Collapse, Divider, Modal, Input, Button, message,} from 'antd'
import { CaretRightOutlined, DeleteOutlined, EditOutlined,
  ExclamationCircleOutlined, DeleteTwoTone
} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getUserCollections, getCurrentUserCollectBlogs, updateCollection,
  deleteCollection, deleteCollectBlog,
} from '../../api/index'
import {formatDate} from '../../utils/utils'
import './My.less'

const MyPage = () => {
  const { Panel } = Collapse
  const { confirm } = Modal
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const userInfo = useSelector(state => state.userInfo)
  const [currentUserCollections, setCurrentUserCollections] = useState([])
  const [currentEditCollection, setCurrentEditCollection] = useState()
  const [newName, setNewName] = useState('')

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

  return (
    <div>
      <div className="content-container">
        <Divider orientation="left">收藏的博客</Divider>
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