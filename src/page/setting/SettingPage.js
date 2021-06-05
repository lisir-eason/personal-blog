import {useState, useEffect} from 'react'
import { Form, Input, Button, Checkbox, Radio, Upload } from 'antd'
import {useSelector} from 'react-redux'
import ImgCrop from 'antd-img-crop'
import Header from '../../component/Header'
import './settingPage.less'

const SettingPage = () => {
  const layout = {labelCol: { span: 4,},wrapperCol: {span: 8},}
  const tailLayout = {wrapperCol: {offset: 4,span: 16,}}
  const options = [
    { label: '男', value: 1 },
    { label: '女', value: 2 },
    { label: '保密', value: 3,},
  ]

  const userInfo = useSelector(state => state.userInfo)
  const [fileList, setFileList] = useState([])
  const [form] = Form.useForm()
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
    console.log(values)
  }

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue(userInfo)
      setFileList([{uid: '-1', status: 'done', url: userInfo.picture,}])
    }
  }, [userInfo])

  return (
    <div>
      <Header active='setting' />
      <div className='content-container'>
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name='userName'
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input />
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
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="头像"
            name="picture"
          >
            <ImgCrop rotate>
              <Upload
                action="/utils/upload"
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
            <Button className='change-password-btn' danger>
              修改密码
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default SettingPage