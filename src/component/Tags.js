import {useState, useRef, Fragment, useEffect} from 'react'
import { Input, Tag, } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './Tags.less'

const Tags = ({
  tags, setTags, readonly
}) => {
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState()
  const editInput = useRef()
  const saveInput = useRef()
  const colors = ['magenta', 'geekblue', 'red', 'volcano', 'orange', 'purple' , 'blue', 'green', 'gold', 'orange',]

  useEffect(() => {
    if (saveInput.current) {
      saveInput.current.focus()
    }
  }, [inputVisible])

  useEffect(() => {
    if (editInput.current) {
      editInput.current.focus()
    }
  }, [editInputIndex])

  const handleClose = removedTag => {
    const filterTags = tags.filter(tag => tag !== removedTag)
    setTags(filterTags)
  }

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    let newTags
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue]
    }
    setTags(newTags)
    setInputVisible(false)
    setInputValue('')
  }

  const handleEditInputChange = e => {
    setInputValue(e.target.value)
  }

  const handleEditInputConfirm = () => {
    const newTags = [...tags]
    newTags[editInputIndex] = editInputValue
    setTags(newTags)
    setEditInputIndex(-1)
    setInputValue('')
  }

  return (
    <Fragment>
      {
        tags && tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInput}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            )
          }
          return (
            <Tag
              className="edit-tag"
              key={tag}
              color={colors[index]}
              closable={!readonly}
              onClose={() => handleClose(tag)}
            >
              <span
                onDoubleClick={e => {
                  if (readonly) {
                    return
                  }
                  setEditInputIndex(index)
                  setEditInputValue(tag)
                  e.preventDefault()
                }}
              >
                {tag}
              </span>
            </Tag>
          )
        })
      }
      {
        inputVisible &&
          <Input
            ref={saveInput}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
      }
      {!inputVisible && !readonly &&
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> 新标签
        </Tag>
      }
    </ Fragment>
  )
}

export default Tags