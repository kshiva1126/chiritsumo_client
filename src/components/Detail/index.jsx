import React, { useState, useEffect } from 'react'
import { axios } from '../../config/axios'
import { useParams } from 'react-router'
import { Container as Vessel, Segment, Header, Icon } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import Container from './style'
import Fav from './Fav'
import Edit from '../Edit'
import { Link } from 'react-router-dom'

const Detail = props => {
  const { id } = useParams()
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
      .get(`/api/post/${id}`)
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
            {props.user_id > 0 && (
              <div className="wrap_menu">
                <Fav user_id={props.user_id} post_id={post.id} />
              </div>
            )}
            {props.user_id === post.writer_id && (
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
