import React, { useState, useEffect } from 'react'
import Container from './style'
import { axios } from '../../utils/axios'

import { Card, Icon, Container as Vessel } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [posts, setPosts] = useState([
    {
      id: 0,
      title: '',
      short_content: '',
      created_at: '',
      updated_at: '',
      writer_id: 0,
      writer_name: ''
    }
  ])

  const getTimeline = () => {
    axios
      .get(`https://kshiva1126.com/chiritsumo/server/api/timeline`)
      .then(res => {
        setPosts(res.data.posts)
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

  useEffect(() => {
    getTimeline()
  }, [])

  return (
    <Container>
      <Vessel>
        <div>
          <h2>タイムライン</h2>
          {posts.map(p => (
            <Card
              key={p.id}
              as={Link}
              to={'/post/' + encodeURIComponent(String(p.id))}
              fluid
            >
              <Card.Content>
                <Card.Header>{p.title}</Card.Header>
                <Card.Description>{p.short_content}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div>
                  <Icon name="user" />
                  {p.writer_name}&nbsp;&nbsp;&nbsp;
                  <Icon name="calendar alternate" />
                  {p.updated_at}
                </div>
                <div className="right"></div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </Vessel>
    </Container>
  )
}

export default Home
