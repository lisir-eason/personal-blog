import {useState, useEffect,} from 'react'
import BraftEditor from 'braft-editor'
import {useDispatch, useSelector} from 'react-redux'
import {Modal,Form, Input,} from 'antd'
import ReactHtmlParser from 'react-html-parser'
import Tags from '../../component/Tags'
import { CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons'
import 'braft-editor/dist/index.css'
import 'braft-editor/dist/output.css'
import './EditPage.less'

const EditPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const editorInfo = useSelector(state => state.editorInfo)
  const {title, tags, rawContent, isSave} = editorInfo
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(rawContent))
  const dispatch = useDispatch()
  const controls = [
    'text-indent', 'separator',
    'headings','text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'hr', 'emoji', 'separator',
    'media', 'separator',
  ]
  const preview = () => {
    setIsModalVisible(true)
  }
  const setTags = (tag) => {
    dispatch({type: 'set_editor_info', payload: {tags: tag}})
  }
  const setIsSave = (flag) => {
    dispatch({type: 'set_editor_info', payload: {isSave: flag}})
  }
  const extendControls = [
    {
      key: 'custom-button',
      type: 'button',
      text: '预览',
      onClick: preview
    }
  ]
  const modalTitle =
    <div>
      <span className='modal-title'>{title ? title : '请输入标题'}</span>
      <Tags tags={tags} readonly/>
    </div>

  useEffect(() => {
    // const htmlContent = await fetchEditorContent()
    // setEditorState(BraftEditor.createEditorState(htmlContent))
  }, [])

  const handleEditorChange = (state) => {
    setEditorState(state)
    const raw = state.toRAW()
    if (raw !== rawContent) {
      setIsSave(false)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const submitContent = async () => {
    const htmlContent = editorState.toHTML()
    const raw = editorState.toRAW()
    setIsSave(true)
    dispatch({type: 'set_editor_info', payload: {htmlContent, rawContent: raw}})
  }


  return (
    <div>
      <div className='content-container'>
        <div className="my-component">
          <Form layout='inline'>
            <Form.Item label="文章标题" >
              <Input placeholder="请输入标题" style={{width: '200px'}}
                value={editorInfo.title}
                onChange={e => {
                  dispatch({type: 'set_editor_info', payload: {title: e.target.value}})
                }}/>
            </Form.Item>
            <Form.Item label="文章标签" >
              <Tags tags={tags} setTags={setTags}/>
            </Form.Item>
          </Form>
          <BraftEditor
            value={editorState}
            onChange={handleEditorChange}
            onSave={submitContent}
            controls={controls}
            extendControls={extendControls}
            contentStyle={{minHeight: 'calc(100vh - 170px)'}}
          />
        </div>
      </div>
      <Modal
        title={modalTitle}
        style={{ top: 52 }}
        onCancel={handleCancel}
        visible={isModalVisible}
        footer ={null}
        width={1000}
      >
        <div className="braft-output-content">{editorState && ReactHtmlParser(editorState.toHTML())}</div>
      </Modal>
      {
        isSave ?
          <div className='editor-status-box'><CheckCircleTwoTone twoToneColor="#52c41a" />已保存</div>:
          <div className='editor-status-box'><ExclamationCircleTwoTone twoToneColor="#F5222D"/>未保存</div>
      }
    </div>
  )
}

export default EditPage

