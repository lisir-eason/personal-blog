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
            {/* <svg t="1623205015352" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6713" width="28" height="28"><path d="M789.504 890.368H319.488c-18.432 0-33.28 14.848-33.28 33.28s14.848 33.28 33.28 33.28h470.016c18.432 0 33.28-14.848 33.28-33.28s-14.848-33.28-33.28-33.28z" fill="#d81e06" p-id="6714"></path><path d="M731.648 392.192c68.096-118.272 79.36-283.136 79.872-289.792 1.024-12.288-5.632-24.576-16.384-30.72-10.752-6.144-24.064-6.144-34.816 0.512-24.576 15.872-241.152 156.16-287.744 235.52-68.096 114.688-235.52 420.864-237.056 423.936-1.536 2.56-2.048 5.12-3.072 7.68l-91.648 158.72c-9.216 15.872-3.584 36.352 12.288 45.568 5.12 3.072 10.752 4.608 16.384 4.608 11.264 0 22.528-6.144 28.672-16.896L291.84 769.536c58.368-39.936 371.2-258.048 439.808-377.344z m-201.728-51.2c23.04-39.424 122.368-115.2 206.336-173.056-9.216 54.272-27.648 130.56-61.952 190.976-39.936 68.608-190.976 189.952-310.272 278.016 54.272-98.816 126.464-229.376 165.888-295.936z" fill="#d81e06" p-id="6715"></path></svg> */}
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