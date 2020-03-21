import React, { useState } from 'react'
import {
  Modal,
  Header,
  Button,
  Icon,
  Input,
  Responsive
} from 'semantic-ui-react'
import { axios } from '../../utils/axios'
import { InputStyle, EditorStyle } from './style'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import ModeToggleCust from '../EditorPlugin/ModeToggleCust'

const Edit = props => {
  const [values, setValues] = useState({
    title: props.title,
    content: props.content,
    post_id: props.post_id
  })

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setValues({ ...values, [name]: value })
  }

  const handleEditorChange = ({ html, text }) => {
    setValues({ ...values, content: text })
  }

  const checkError = () => {
    let err = false
    if (!values.title) {
      err = true
      alert('タイトルは必須です')
    }
    if (values.title.length > 100) {
      err = true
      alert('タイトルは100文字以内で入力してください')
    }
    if (!values.content) {
      err = true
      alert('本文は必須です')
    }
    if (values.content.length > 1000) {
      err = true
      alert('本文は1000文字以内で入力してください')
    }

    return err
  }

  const edit = async () => {
    if (checkError() === false) {
      const data = { ...values }
      await axios
        .post('https://kshiva1126.com/chiritsumo/server/api/edit', data)
        .then(res => {
          window.location.href = '/home'
        })
        .catch(err => {
          const status = err.response.status
          if (status !== 422) {
            window.location.href = '/login'
          }
        })
    }
  }

  const mdParser = new MarkdownIt(/* Markdown-it options */)
  MdEditor.use(ModeToggleCust)

  return (
    <Modal
      trigger={<span className="wrap_menu edit">編集する</span>}
      closeIcon
      basic
    >
      <Modal.Content>
        <Header>
          <InputStyle>
            <Input
              name="title"
              placeholder="タイトル"
              defaultValue={values.title}
              onChange={handleInputChange}
            />
          </InputStyle>
        </Header>
        <EditorStyle>
          <Responsive minWidth={600}>
            <MdEditor
              name="content"
              value={values.content}
              renderHTML={text => mdParser.render(text)}
              onChange={handleEditorChange}
              plugins={[
                'header',
                'fornts',
                'link',
                'clear',
                'logger',
                'mode-toggle',
                'full-screen'
              ]}
            />
          </Responsive>
          <Responsive maxWidth={599}>
            <MdEditor
              name="content"
              value={values.content}
              renderHTML={text => mdParser.render(text)}
              onChange={handleEditorChange}
              config={{
                view: {
                  menu: true,
                  md: true,
                  html: false
                }
              }}
              plugins={[
                'header',
                'fornts',
                'link',
                'clear',
                'logger',
                'mode-toggle-cust',
                'full-screen'
              ]}
            />
          </Responsive>
        </EditorStyle>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={edit}>
          <Icon name="paper plane" /> 保存する
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Edit
