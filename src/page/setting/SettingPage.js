import {useState, useEffect} from 'react'
import { Form, Input, Button, Checkbox, Radio, Upload, Modal, Space, notification, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {useSelector, useDispatch} from 'react-redux'
import ImgCrop from 'antd-img-crop'
import './settingPage.less'
import {updateUserInfo, changePassword} from '../../api/index'

const SettingPage = () => {
  const layout = {labelCol: { span: 4,},wrapperCol: {span: 8},}
  const psLayout = {labelCol: { offset: 3, span: 4,},wrapperCol: {span: 12},}
  const tailLayout = {wrapperCol: {offset: 4,span: 16,}}
  const options = [
    { label: '男', value: 1 },
    { label: '女', value: 2 },
    { label: '保密', value: 3,},
  ]
  const userInfo = useSelector(state => state.userInfo)
  const [fileList, setFileList] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [password, setPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { confirm } = Modal
  let actionUrl

  if (process.env.NODE_ENV === 'development') {
    // baseUrl = 'http://localhost:3001'
    actionUrl = '/utils/upload'
  } else {
    actionUrl = '/apis/utils/upload'
  }

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue(userInfo)
      setFileList([{uid: '-1', status: 'done', url: userInfo.picture,}])
    }
  }, [userInfo])

  const onChange = ({ fileList: newFileList }) => {
    if (newFileList.length && newFileList[0].status === 'done') {
      const file = newFileList[0]
      form.setFieldsValue({picture: file.response.data.url})
      setFileList([{...file, url: file.response.data.url}])
      return
    }
    if (!newFileList.length) {
      form.setFieldsValue({picture: userInfo.picture})
    }
    setFileList(newFileList)
  }

  const onFinish = (values) => {
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: '您确定修改个人信息吗？',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        updateUserInfo(values).then(res => {
          dispatch({type: 'set_user_info', payload: res.data.data})
          notification.success({
            message: '信息修改成功！'
          })
        })
      },
      onCancel() {},
    })
  }

  const handleOk = () => {
    if (!password) {
      message.error('原密码不能为空！')
      return
    }
    if (!newPassword) {
      message.error('新密码不能为空！')
      return
    }
    if (newPassword === password) {
      message.error('新密码不能和旧密码相同！')
      return
    }
    const params = {
      password,
      newPassword
    }
    changePassword(params).then(res => {
      setIsModalVisible(false)
      notification.success({
        message: '密码修改成功！'
      })
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <div className='content-container'>
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name='userName'
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="昵称"
            name='nickName'
            rules={[
              {
                required: true,
                message: '请输入昵称!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='性别'
            name='gender'
          >
            <Radio.Group
              options={options}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item
            label="城市"
            name="city"
            rules={[
              {
                required: true,
                message: '请输入城市!',
              },
            ]}
          >
            <Input placeholder='请输入城市!' />
          </Form.Item>
          <Form.Item
            label="个性签名"
            name="signature"
          >
            <Input placeholder='请输入个性签名!' />
          </Form.Item>
          <Form.Item
            label="QQ"
            name="qq"
          >
            <Input placeholder='请输入qq号码!' />
          </Form.Item>
          <Form.Item
            label="微信"
            name="weChat"
          >
            <Input placeholder='请输入微信!' />
          </Form.Item>
          <Form.Item
            label="GitHub"
            name="github"
          >
            <Input placeholder='请输入github地址!' />
          </Form.Item>
          <Form.Item
            label="头像"
            name="picture"
          >
            <ImgCrop rotate>
              <Upload
                action={actionUrl}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                maxCount={1}
              >
                {fileList.length < 5 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button className='change-password-btn' danger onClick={() => {
              setIsModalVisible(true)
            }}>
              修改密码
            </Button>
          </Form.Item>
        </Form>
        <Modal title="修改密码" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Form
            {...psLayout}
            name="basic"
          >
            <Form.Item
              label="原密码"
            >
              <Input.Password value={password} onChange={e => {
                setPassword(e.target.value)
              }}/>
            </Form.Item>
            <Form.Item
              label="新密码"
            >
              <Input.Password value={newPassword} onChange={e => {
                setNewPassword(e.target.value)
              }}/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  )
}

export default SettingPage