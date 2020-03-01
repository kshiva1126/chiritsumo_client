import React, { useState, useEffect } from 'react'
import { axios } from '../../utils/axios'
import { useParams } from 'react-router'
import { Container as Vessel, Segment, Header, Icon } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import Container from './style'
import Fav from './Fav'
import Edit from '../Edit'
import { Link } from 'react-router-dom'
import useAuth from '../../utils/useAuth'

const Detail = props => {
  const { id } = useParams()
  const [auth, loginUser] = useAuth()
  const [post, setPost] = useState({
    id: 0,
    title: '',
    content: '',
    created_at: '',
    updated_at: '',
    writer_id: '',
    writer_name: ''
  })

  const getPost = id => {
    axios
      .get(`https://kshiva1126.com/chiritsumo/server/api/post/${id}`)
      .then(res => {
        setPost(res.data)
      })
      .catch(err => {
        alert('不明なエラーです。')
      })
  }

  useEffect(() => {
    getPost(id)
  }, [id])

  return (
    <Container>
      <Vessel>
        <Segment>
          <Header as="h1">{post.title}</Header>
          <ReactMarkdown
            source={post.content}
            escapeHtml={false}
            parserOptions={{ commonmark: true }}
            renderers={{ code: CodeBlock }}
          />
          <div className="menu">
            <div className="wrap_menu">
              <Link to={'/user/' + encodeURIComponent(String(post.writer_id))}>
                <Icon name="user" />
                {post.writer_name}
              </Link>
            </div>
            <div className="wrap_menu">
              <Icon name="calendar" />
              {post.updated_at}
            </div>
            {loginUser.id > 0 && (
              <div className="wrap_menu">
                <Fav user_id={loginUser.id} post_id={post.id} />
              </div>
            )}
            {loginUser.id === post.writer_id && (
              <Edit
                title={post.title}
                content={post.content}
                post_id={post.id}
              />
            )}
          </div>
        </Segment>
      </Vessel>
    </Container>
  )
}

export default Detail
