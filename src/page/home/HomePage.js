import React, {useEffect, useState, Fragment} from 'react'
import { List, Avatar, Space, message, Spin } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import Tags from '../../component/Tags'
import {useHistory} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import {getHomeBlogs} from '../../api/index'
import moment from 'moment'
import './HomePage.less'

import Header from '../../component/Header'


const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const {push} = useHistory()
  const perPage = 6

  useEffect(() => {
    getHomeBlogs({page: 1, perPage}).then(res => {
      if (res.data) {
        const blogs = res.data.data.list
        const list = blogs.map(item => {
          return {
            href: `/view/${item.id}`,
            title: item.title,
            avatar: item.picture,
            description: item.tags,
            content: item.description,
            userName: item.userName,
            nickName: item.nickName,
            updatedAt: item.updatedAt,
          }
        })
        setData(list)
        setCount(res.data.data.count)
      }
    })
  }, [])

  const IconText = ({ icon, text }) =>
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>

  const DescriptionBox = ({tags, userName, nickName, updatedAt}) => {
    return <div className='author-box'>
      <span className='author-user' onClick={() => {
        push(`/profile/${userName}`)
      }}>{nickName}</span>
      <span className="article-date middle-text">{moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
      <Tags tags={tags} readonly/>
    </div>
  }

  const handleInfiniteOnLoad = (nextPage) => {
    const dataCopy = data.concat([])
    setLoading(true)
    if (data.length >= count) {
      // message.warning('没有更多数据了！')
      setLoading(false)
      setHasMore(false)
      return
    }
    getHomeBlogs({page: nextPage, perPage}).then(res => {
      if (res.data) {
        const blogs = res.data.data.list
        const list = blogs.map(item => {
          return {
            href: `/view/${item.id}`,
            title: item.title,
            avatar: item.picture,
            description: item.tags,
            content: item.description,
            userName: item.userName,
            nickName: item.nickName,
            updatedAt: item.updatedAt,
          }
        })
        setData(dataCopy.concat(list))
        setCount(res.data.data.count)
        setLoading(false)
      }
    })
  }

  return (
    <Fragment>
      <Header active="home" />
      <div className='content-container'>
        <InfiniteScroll
          initialLoad={false}
          pageStart={1}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={true}
        >
          <List
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={item =>
              <List.Item
                key={item.id}
                actions={[
                  <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} size={40} onClick={() => {
                    push(`/profile/${item.userName}`)
                  }}/>}
                  title={<a href={item.href}>{item.title}</a>}
                  description={ <DescriptionBox tags={item.description} userName={item.userName}
                    nickName={item.nickName} updatedAt={item.updatedAt}/>}
                />
                <p className='blog-description' onClick={() => {
                  push(item.href)
                }}>
                  {item.content}
                </p>
              </List.Item>
            }
          />
          {
            loading && hasMore &&
              <div className="loading-container">
                <Spin tip='数据加载中...' wrapperClassName='home-page-spin'/>
              </div>
          }
        </InfiniteScroll>
      </div>
    </Fragment>
  )
}

export default HomePage