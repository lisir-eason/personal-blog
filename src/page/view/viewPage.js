import {useEffect, useState, Fragment, useRef} from 'react'
import {useParams, useHistory, useLocation} from 'react-router-dom'
import {getBlogInfoById, increaseViewCount, getBlogLikers,
  userLikeBlog, unLikeBlog, getUserCollections, createCollection,
  createCollectBlog, getBlogCollects, deleteCollectBlogByBlogId,
  createComment, getBlogCommentById, readNotificationByBlogId,
  getCurrentUserNotification,
} from '../../api/index'
import { Avatar, Button, Skeleton, Tooltip, Modal, Checkbox,
  Row, Col, Input, message, Comment, Form, List, Divider, Anchor, } from 'antd'
import { LikeTwoTone, StarTwoTone, EyeOutlined } from '@ant-design/icons'
import {useSelector, useDispatch} from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import Tags from '../../component/Tags'
import './viewPage.less'
import 'braft-editor/dist/output.css'
import userDefaultImg from '../../static/user.png'
import {dateFromNow, formatDate, makeTree,} from '../../utils/utils'

const viewPage = () => {
  const {id} = useParams()
  const [blogInfo, setBlogInfo] = useState()
  const [likerCount, setLikerCount] = useState('**')
  const [likerList, setLikerList] = useState([])
  const [collectorCount, setCollectorCount] = useState('**')
  const [collectorList, setCollectorList] = useState([])
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState('')
  const [currentUserCollections, setCurrentUserCollections] = useState([])
  const [checkCollections, setCheckCollections] = useState([])
  const userInfo = useSelector(state => state.userInfo)
  const [currentUserIsLike, setCurrentUserIsLike] = useState(false)
  const [currentUserIsCollect, setCurrentUserIsCollect] = useState(false)
  const [commentList, setCommentList] = useState([])
  const [sourceCommentList, setSourceCommentList] = useState([])
  const [submitLoading, setSubmitLoading] = useState(false)
  const [textValue, setTextValue] = useState('')
  const linkToComment = useRef()
  const dispatch = useDispatch()
  const {push} = useHistory()
  const {hash} = useLocation()
  const { Search } = Input
  const { TextArea } = Input
  const { Link } = Anchor

  const getBlogComment = () => {
    getBlogCommentById({blogId: id}).then(res => {
      if (res && res.data) {
        const data = res.data.data.map(item => {
          return {...item, showInput: false, commitLoading: false}
        })
        setSourceCommentList(data)
        setCommentList(makeTree(data))
      }
    })
  }

  useEffect(() => {
    getBlogInfoById(id).then(res => {
      if (res && res.data) {
        setBlogInfo(res.data.data)
        increaseViewCount({id: res.data.data.blog.id})
      }
    })
    getBlogLikers({blogId: id}).then(res => {
      setLikerCount(res.data.data.count)
      setLikerList(res.data.data.users)
    })
    getBlogCollects({blogId: id}).then(res => {
      if (res && res.data) {
        setCollectorList(res.data.data)
        setCollectorCount(res.data.data.length)
      }
    })
    getBlogComment()
  }, [id])

  useEffect(() => {
    if (linkToComment.current && hash && hash === '#comment') {
      linkToComment.current.handleClick()
    }
  }, [linkToComment.current])

  useEffect(() => {
    if (userInfo) {
      likerList.map(item => {
        if (item.userName === userInfo.userName) {
          setCurrentUserIsLike(true)
        }
      })
    }
  }, [likerList])

  useEffect(() => {
    if (userInfo) {
      readNotificationByBlogId({blogId: id}).then(res => {
        if (res && res.data) {
          getCurrentUserNotification().then(result => {
            if (result && result.data) {
              dispatch({type: 'set_notification_info', payload: result.data.data})
            }
          })
        }
      })
    }
  }, [userInfo])

  useEffect(() => {
    if (userInfo) {
      collectorList.map(item => {
        if (item.userName === userInfo.userName) {
          setCurrentUserIsCollect(true)
        }
      })
    }
  }, [collectorList])

  const likeBlog = () => {
    if (!userInfo) {
      dispatch({type: 'set_login_modal', payload: true})
      return
    }
    userLikeBlog({id: blogInfo.blog.id}).then(res => {
      if (res && res.data) {
        setCurrentUserIsLike(true)
        setLikerCount(likerCount + 1)
      }
    })
  }

  const userUnLikeBlog = () => {
    unLikeBlog({id: blogInfo.blog.id}).then(res => {
      if (res && res.data) {
        setCurrentUserIsLike(false)
        setLikerCount(likerCount - 1)
      }
    })
  }

  const cancelCollect = () => {
    deleteCollectBlogByBlogId({blogId: id}).then(res => {
      if (res && res.data) {
        setCurrentUserIsCollect(false)
        setCollectorCount(collectorCount - 1)
      }
    })
  }

  const getCollectionByUserId = () => {
    getUserCollections({userId: userInfo.id}).then(res => {
      if (res && res.data) {
        setCurrentUserCollections(res.data.data)
      }
    })
  }

  const openCollect = () => {
    if (!userInfo) {
      dispatch({type: 'set_login_modal', payload: true})
      return
    }
    setVisible(true)
    getCollectionByUserId()
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const addToCollection = () => {
    if (!checkCollections.length) {
      message.error('请至少选择一个文件夹！')
      return
    }
    const params = {
      blogId: id,
      collectionId: checkCollections[0]
    }
    setConfirmLoading(true)
    createCollectBlog(params).then(res => {
      if (res && res.data) {
        setConfirmLoading(false)
        message.success('收藏成功！')
        setCurrentUserIsCollect(true)
        setCollectorCount(collectorCount + 1)
        setVisible(false)
      }
    })
  }

  const onCheckBoxChange = (checkedValues) => {
    const check = checkedValues.filter(item => !checkCollections.includes(item))
    setCheckCollections(check)
  }

  const createUserCollection = () =>{
    if (!newCollectionName) {
      message.error('文件夹名不能为空！')
      return
    }
    setCreateLoading(true)
    createCollection({collectionName: newCollectionName}).then(res => {
      if (res && res.data) {
        getCollectionByUserId()
        setCreateLoading(false)
        setNewCollectionName('')
      }
    })
  }

  const toggleInput = (comments) => {
    if (!userInfo) {
      dispatch({type: 'set_login_modal', payload: true})
      return
    }
    const change = sourceCommentList.map(item => {
      if (item.id === comments.id) {
        item.showInput = !item.showInput
      } else {
        item.showInput = false
      }
      return item
    })
    setSourceCommentList(change)
    setCommentList(makeTree(change))
  }

  const toggleCommitLoading = (comments) => {
    const change = sourceCommentList.map(item => {
      if (item.id === comments.id) {
        item.commitLoading = !item.commitLoading
      } else {
        item.commitLoading = false
      }
      return item
    })
    setSourceCommentList(change)
    setCommentList(makeTree(change))
  }

  const commitComment = (comments, value) => {
    if (!value) {
      message.error('评论内容不能为空！')
      return
    }
    toggleCommitLoading(comments)
    const params = {
      blogId: id,
      content: value,
      replyToId: comments.id
    }

    createComment(params).then(res => {
      if (res && res.data) {
        toggleCommitLoading(comments)
        toggleInput(comments)
        getBlogComment()
      }
    })
  }

  const CommentTree = ({ comments }) =>
    <Comment
      actions={comments.showInput ?
        [<span key="comment-nested-reply-to" onClick={()=> {
          toggleInput(comments)
        }}>取消回复</span>,
        <Search enterButton="提交" size="small"
          loading={comments.commitLoading} onSearch={(value) => {
            commitComment(comments, value)
          }}/>] :
        [<span key="comment-nested-reply-to" onClick={()=> {
          toggleInput(comments)
        }}>回复</span>]
      }
      author={comments.nickName}
      avatar={comments.picture}
      content={<p>{comments.content}</p>}
      datetime={dateFromNow(comments.createdAt)}>
      {
        comments.children && comments.children.map(item => {
          return <CommentTree key={item.id} comments={item} />
        })
      }
    </Comment>


  const handleSubmit = () => {
    if (!userInfo) {
      dispatch({type: 'set_login_modal', payload: true})
      return
    }
    if (!textValue) {
      message.error('评论内容不能为空！')
      return
    }
    setSubmitLoading(true)
    const params = {
      blogId: id,
      content: textValue,
      replyToId: 0
    }

    createComment(params).then(res => {
      if (res && res.data) {
        setSubmitLoading(false)
        setTextValue('')
        getBlogComment()
      }
    })
  }

  const handleChange = e => {
    setTextValue(e.target.value)
  }


  return (
    <div>
      <div className='content-container'>
        {
          blogInfo ?
            <Fragment>
              <div className='article-title'>
                <span className='title-span'>{blogInfo.blog.title}</span>
                <Tags tags={blogInfo.blog.tags} readonly/>
                {
                  userInfo && userInfo.userName === blogInfo.user.userName &&
                    <Button type="primary" onClick={() => {
                      push(`/edit/${blogInfo.blog.id}`)
                    }}>编辑</Button>
                }
              </div>
              <Anchor className='link-to-comment'><Link ref={linkToComment} href="#comment" title="去评论区" /></Anchor>
              <div className='author-info'>
                <Avatar size={28} src={blogInfo.user.picture} />
                <span className='author-user' onClick={() => {
                  push(`/profile/${blogInfo.user.userName}`)
                }}>{blogInfo.user.nickName}</span>
                <span className="article-date">{formatDate(blogInfo.blog.updatedAt)}</span>
                <div className='article-count-box'>
                  <Tooltip title="">
                    <EyeOutlined className="article-count-curser-default" onClick={() => {
                    }} />
                    <span className="article-count">{blogInfo.blog.viewCount}</span>
                  </Tooltip>
                  {
                    userInfo && currentUserIsLike ?
                      <div className='article-count-label' onClick={userUnLikeBlog}>
                        <Tooltip title="取消喜欢">
                          <LikeTwoTone />
                        </Tooltip>
                        <span className="article-count check-color">{likerCount}</span>
                      </div> :
                      <div className='article-count-label' onClick={likeBlog}>
                        <Tooltip title="喜欢">
                          <LikeTwoTone twoToneColor='#555666'/>
                        </Tooltip>
                        <span className="article-count">{likerCount}</span>
                      </div>
                  }
                  {
                    userInfo && currentUserIsCollect ?
                      <div className='article-count-label' onClick={cancelCollect}>
                        <Tooltip title="取消收藏">
                          <StarTwoTone />
                        </Tooltip>
                        <span className="article-count check-color">{collectorCount}</span>
                      </div> :
                      <div className='article-count-label' onClick={openCollect}>
                        <Tooltip title="收藏">
                          <StarTwoTone twoToneColor='#555666'/>
                        </Tooltip>
                        <span className="article-count">{collectorCount}</span>
                      </div>
                  }
                </div>
              </div>
              <div className="braft-output-content">{ReactHtmlParser(blogInfo.blog.htmlContent)}</div>
            </Fragment> :
            <Fragment>
              <Skeleton active paragraph={{rows:0}}/>
              <Skeleton active avatar paragraph={{rows:8}}/>
            </Fragment>
        }
        <Divider orientation="left" id="comment">评论区</Divider>
        {
          commentList.length > 0 &&
            <List
              dataSource={commentList}
              header={`${commentList.length} ${commentList.length > 1 ? '评论' : '评论'}`}
              itemLayout="horizontal"
              renderItem={item =>
                <CommentTree comments={item} />
              }
            />
        }
        <Comment
          avatar={
            <Avatar
              src={userInfo ? userInfo.picture : userDefaultImg}
              alt={userInfo ? userInfo.nickName : '游客'}
            />
          }
          content={
            <Fragment>
              <Form.Item>
                <TextArea rows={4} onChange={handleChange} value={textValue} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" loading={submitLoading} onClick={handleSubmit} type="primary">
                  添加评论
                </Button>
              </Form.Item>
            </Fragment>
          }
        />
      </div>
      <Modal
        title="收藏博客"
        visible={visible}
        onOk={addToCollection}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Checkbox.Group style={{ width: '100%' }} onChange={onCheckBoxChange} value={checkCollections}>
          {
            currentUserCollections.map(item => {
              return <Row key={item.id}>
                <Col span={24}>
                  <Checkbox value={item.id}>{item.collectionName}</Checkbox>
                </Col>
              </Row>
            })
          }
        </Checkbox.Group>
        <Search placeholder="请输入文件夹名" enterButton="创建"
          loading={createLoading}
          prefix="新文件夹："
          style={{margin: '15px 0 0 0'}}
          onChange={(e) => {
            setNewCollectionName(e.target.value)
          }}
          value={newCollectionName}
          onSearch={createUserCollection}/>
      </Modal>
    </div>
  )
}


export default viewPage