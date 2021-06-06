import {useState, useEffect} from 'react'
import Header from '../../component/Header'
import BraftEditor from 'braft-editor'
import {Modal,Form, Input, Button} from 'antd'
import ReactHtmlParser from 'react-html-parser'
import 'braft-editor/dist/index.css'
import 'braft-editor/dist/output.css'

const EditPage = () => {
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
  const [isModalVisible, setIsModalVisible] = useState(false)
  const controls = [
    'undo', 'redo', 'separator',
    'headings','text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'separator',
    'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'hr', 'emoji', 'separator',
    'media', 'separator',
  ]
  const preview = () => {
    setIsModalVisible(true)
  }
  const extendControls = [
    {
      key: 'custom-button',
      type: 'button',
      text: '预览',
      onClick: preview
    }
  ]

  useEffect(() => {
    // const htmlContent = await fetchEditorContent()
    // setEditorState(BraftEditor.createEditorState(htmlContent))
  }, [])

  const handleEditorChange = (state) => {
    setEditorState(state)
  }

  const submitContent = async () => {
    const htmlContent = editorState.toHTML()
    // const result = await saveEditorContent(htmlContent)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleSubmit = () => {

  }

  return (
    <div>
      <Header active='edit' />
      <div className='content-container'>
        <div className="my-component">
          <Form onSubmit={handleSubmit} layout='inline'>
            <Form.Item label="文章标题" >
              <Input placeholder="请输入标题" style={{width: '200px'}}/>
            </Form.Item>
            <Form.Item label="文章标签" >
              <Input placeholder="请输入标签"/>
            </Form.Item>
          </Form>
          <BraftEditor
            value={editorState}
            onChange={handleEditorChange}
            onSave={submitContent}
            controls={controls}
            extendControls={extendControls}
            contentStyle={{minHeight: 'calc(100vh - 140px)'}}
          />
        </div>
      </div>
      <Modal
        title="预览"
        style={{ top: 52 }}
        onCancel={handleCancel}
        visible={isModalVisible}
        footer ={null}
        width={1000}
      >
        <div class="braft-output-content">{editorState && ReactHtmlParser(editorState.toHTML())}</div>
      </Modal>
    </div>
  )
}

export default EditPage

