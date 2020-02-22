import React, { useState, useEffect } from 'react'
import Container from './style'
import { axios } from '../../config/axios'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Following from './Following'

import {
  Card,
  Icon,
  Container as Vessel,
  Image,
  Segment
} from 'semantic-ui-react'

const User = props => {
  const { id } = useParams()
  const [user, setUser] = useState({
    id: 0,
    name: '',
    image_path: null,
    description: '',
    followee: 0,
    follower: 0
  })

  const [posts, setPosts] = useState([
    {
      id: 0,
      title: '',
      content: '',
      created_at: '',
      updated_at: '',
      writer_name: ''
    }
  ])

  const getUser = id => {
    axios
      .get('/api/user/' + encodeURIComponent(String(id)))
      .then(res => {
        setUser({
          ...res.data.user
        })
        setPosts(res.data.posts)
      })
      .catch(err => {
        alert('不明なエラーです。')
      })
  }

  useEffect(() => {
    getUser(id)
  }, [id])

  const image_file = user.image_path ? user.image_path : 'avator.png'

  return (
    <Container>
      <Vessel>
        <div>
          <Segment>
            <div className="user_container">
              <div className="user_box1">
                <Image
                  circular
                  size="small"
                  src={'http://localhost:8080/storage/images/' + image_file}
                />
                <span className="user_name">{user.name}</span>
              </div>
              <div className="user_box2">
                {props.auth &&
                  (props.user_id > 0 && props.user_id === user.id ? (
                    <div className="edit_profile">
                      <Link to="/profile">プロフィールを編集する</Link>
                    </div>
                  ) : (
                    <div className="follow">
                      <Following user_id={id} />
                    </div>
                  ))}
              </div>
            </div>
            <p className="user_desc">{user.description}</p>
            {props.user_id && (
              <div className="menu">
                <div className="item">
                  <Link to={'/followee/' + encodeURIComponent(String(user.id))}>
                    {user.followee}フォロイー
                  </Link>
                </div>
                <div className="item">
                  <Link to={'/follower/' + encodeURIComponent(String(user.id))} >
                    {user.follower}フォロワー
                  </Link>
                </div>
                <div className="item">
                  <Link to={'/favorite/' + encodeURIComponent(String(user.id))}>お気に入り</Link>
                </div>
              </div>
            )}
          </Segment>
        </div>

        <div>
          <h2>投稿一覧</h2>
          {posts.map(p => (
            <Card
              key={p.id}
              as={Link}
              to={'/post/' + encodeURIComponent(String(p.id))}
              fluid
            >
              <Card.Content>
                <Card.Header>{p.title}</Card.Header>
                <Card.Description>{p.content}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Icon name="user" />
                {p.writer_name}&nbsp;&nbsp;&nbsp;
                <Icon name="calendar alternate" />
                {p.updated_at}
              </Card.Content>
            </Card>
          ))}
        </div>
      </Vessel>
    </Container>
  )
}

export default User
