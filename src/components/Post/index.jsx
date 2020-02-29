import React, { useState } from 'react'
import { Modal, Header, Button, Icon, Input } from 'semantic-ui-react'
import { axios } from '../../utils/axios'
import { InputStyle } from './style'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

const Post = () => {
  const [values, setValues] = useState({
    title: '',
    content: ''
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
      alert('タイトルは50文字以内で入力してください')
    }
    if (!values.content) {
      err = true
      alert('本文は必須です')
    }
    if (values.content.length > 300) {
      err = true
      alert('本文は300文字以内で入力してください')
    }

    return err
  }

  const post = async () => {
    if (checkError() === false) {
      const data = { ...values }
      await axios
        .post('https://kshiva1126.com/chiritsumo/server/api/post', data)
        .then(res => {
          window.location.href = '/home'
        })
        .catch(err => {
          const status = err.response.status
          if (status !== 422) {
            window.location.href = '/login'
          }
          if (err.response.data.auth === false) {
            window.location.href = '/login'
          }
        })
    }
  }

  const mdParser = new MarkdownIt(/* Markdown-it options */)

  return (
    <Modal trigger={<span className="link">投稿する</span>} closeIcon basic>
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
        <MdEditor
          name="content"
          value={values.content}
          renderHTML={text => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={post}>
          <Icon name="paper plane" /> 投稿する
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Post
