import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentUserFocus, unFollowUser,} from '../../api/index'
import {List, Skeleton, Avatar, Button, Modal} from 'antd'
import {ExclamationCircleOutlined } from '@ant-design/icons'
import EmptyBox from '../../component/EmptyBox'

const focusPage = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.userInfo)
  const [list, setList] = useState([])
  const {confirm} = Modal

  const getFocus = () => {
    getCurrentUserFocus().then(res => {
      if (res && res.data) {
        setList(res.data.data)
      }
    })
  }

  useEffect(() => {
    if (userInfo) {
      getFocus()
    }
  }, [userInfo])

  const showDeleteConfirm = (item) =>{
    confirm({
      title: '取消关注',
      icon: <ExclamationCircleOutlined />,
      content: `您确定取消关注“ ${item.nickName} ”吗？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        unFollowUser({userId: item.id}).then(res => {
          if (res && res.data) {
            getFocus()
          }
        })
      },
      onCancel() {},
    })
  }

  return (
    <div>
      <div className="content-container">
        {
          list.length ? <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item =>
              <List.Item
                actions={[<Button type="dashed" size='small' onClick={() => {
                  showDeleteConfirm(item)
                }}>取消关注</Button>]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar src={item.picture} />
                    }
                    title={<a href={`/profile/${item.userName}`}>{item.nickName}</a>}
                    description={item.signature ? item.signature : '这个人很懒，什么也没有留下'}
                  />
                </Skeleton>
              </List.Item>
            }
          /> : <EmptyBox />
        }
      </div>
    </div>
  )
}

export default focusPage