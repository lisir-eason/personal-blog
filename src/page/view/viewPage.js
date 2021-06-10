import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../../component/Header'
import {getBlogInfoById} from '../../api/index'
import { Avatar, Image } from 'antd'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import Tags from '../../component/Tags'
import './viewPage.less'

const viewPage = () => {
  const {id} = useParams()
  const [blogInfo, setBlogInfo] = useState()
  useEffect(() => {
    getBlogInfoById(id).then(res => {
      if (res.data) {
        setBlogInfo(res.data.data)
      }
    })
  }, [id])
  return (
    <div>
      <Header />
      {
        blogInfo && <div className='content-container'>
          <div className='article-title'>
            <span className='title-span'>{blogInfo.blog.title}</span>
            <Tags tags={blogInfo.blog.tags} readonly/>
          </div>
          <div className='author-info'>
            <Avatar size={28} src={blogInfo.user.picture} />
            <span className='author-user'>{blogInfo.user.nickName}</span>
            <span className="article-date">{moment(blogInfo.blog.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
          <div className="braft-output-content">{ReactHtmlParser(blogInfo.blog.htmlContent)}</div>
        </div>
      }

    </div>
  )
}


export default viewPage