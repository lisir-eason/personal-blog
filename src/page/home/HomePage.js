import React, {useEffect, useState, Fragment} from 'react'
import { List, Avatar, Space, Tooltip, Spin, Skeleton, } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons'
import Tags from '../../component/Tags'
import {useHistory} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import {getHomeBlogs} from '../../api/index'
import moment from 'moment'
import './HomePage.less'

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const [firstLoading, setFirstLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  const [count, setCount] = useState(0)
  const {push} = useHistory()
  const perPage = 6
  const defaultData = []
  for (let i = 0; i < perPage; i++) {
    defaultData.push({
      isFake: true,
      href: '',
      title: '',
      avatar: '',
      description: '',
      content: '',
      userName: '',
      nickName: '',
      updatedAt: '',
      collectCount: '**',
      likeCount: '**',
      commentCount: '**'
    })
  }
  const [data, setData] = useState(defaultData)

  useEffect(() => {
    getHomeBlogs({page: 1, perPage}).then(res => {
      if (res) {
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
            viewCount: item.viewCount,
            collectCount: parseInt(Math.random() * 100, 10),
            likeCount: parseInt(Math.random() * 100, 10),
            commentCount: parseInt(Math.random() * 100, 10),
          }
        })
        setData(list)
        setLoading(false)
        setFirstLoading(false)
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
    if (data.length >= count) {
      // message.warning('没有更多数据了！')
      setLoading(false)
      setHasMore(false)
      return
    }
    const dataCopy = data.concat([])
    const fakeData = dataCopy.concat(defaultData)
    setData(fakeData)
    setLoading(true)
    getHomeBlogs({page: nextPage, perPage}).then(res => {
      if (res) {
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
            viewCount: item.viewCount,
            collectCount: parseInt(Math.random() * 100, 10),
            likeCount: parseInt(Math.random() * 100, 10),
            commentCount: parseInt(Math.random() * 100, 10),
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
                  <IconText icon={EyeOutlined} text={item.viewCount} key="list-vertical-eye-o" />,
                  <IconText icon={StarOutlined} text={item.collectCount} key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text={item.likeCount} key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text={item.commentCount} key="list-vertical-message" />,
                ]}
              >
                <Skeleton loading={loading && item.isFake} active avatar>
                  <List.Item.Meta
                    avatar={
                      <Tooltip title={item.nickName} placement="bottom">
                        <Avatar src={item.avatar} size={40} onClick={() => {
                          push(`/profile/${item.userName}`)
                        }}/>
                      </Tooltip>}
                    title={<a href={item.href}>{item.title}</a>}
                    description={ <DescriptionBox tags={item.description} userName={item.userName}
                      nickName={item.nickName} updatedAt={item.updatedAt}/>}
                  />
                  <p className='blog-description' onClick={() => {
                    push(item.href)
                  }}>
                    {item.content}
                  </p>
                </Skeleton>
              </List.Item>
            }
          />
          {
            loading && hasMore && !firstLoading &&
              <div className="loading-container1">
                <Spin/>
              </div>
          }
        </InfiniteScroll>
      </div>
    </Fragment>
  )
}

export default HomePage