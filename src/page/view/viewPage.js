import {useEffect, useState, Fragment} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {getBlogInfoById, increaseViewCount, getBlogLikers,
  userLikeBlog, unLikeBlog,} from '../../api/index'
import { Avatar, Image, Button, Skeleton, Space, Tooltip,} from 'antd'
import { LikeTwoTone, StarTwoTone, EyeOutlined } from '@ant-design/icons'
import {useSelector, useDispatch} from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import Tags from '../../component/Tags'
import './viewPage.less'

const viewPage = () => {
  const {id} = useParams()
  const [blogInfo, setBlogInfo] = useState()
  const [likerCount, setLikerCount] = useState('**')
  const [likerList, setLikerList] = useState([])
  const userInfo = useSelector(state => state.userInfo)
  const [currentUserIsLike, setCurrentUserIsLike] = useState(false)
  const dispatch = useDispatch()
  const {push} = useHistory()

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
  }, [id])

  useEffect(() => {
    if (userInfo) {
      likerList.map(item => {
        if (item.userName === userInfo.userName) {
          setCurrentUserIsLike(true)
        }
      })
    }
  }, [likerList])

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
              <div className='author-info'>
                <Avatar size={28} src={blogInfo.user.picture} />
                <span className='author-user' onClick={() => {
                  push(`/profile/${blogInfo.user.userName}`)
                }}>{blogInfo.user.nickName}</span>
                <span className="article-date">{moment(blogInfo.blog.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
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
                  <div className='article-count-label'>
                    <Tooltip title="收藏">
                      <StarTwoTone twoToneColor='#555666'/>
                    </Tooltip>
                    <span className="article-count">{20}</span>
                  </div>
                </div>
              </div>
              <div className="braft-output-content">{ReactHtmlParser(blogInfo.blog.htmlContent)}</div>
            </Fragment> :
            <Fragment>
              <Skeleton active paragraph={{rows:0}}/>
              <Skeleton active avatar paragraph={{rows:8}}/>
            </Fragment>
        }
      </div>
    </div>
  )
}


export default viewPage