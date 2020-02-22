import React, { useState, useEffect } from 'react'
import Container from './style'
import { axios } from '../../config/axios'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Card, Icon, Container as Vessel, Image } from 'semantic-ui-react'

const Follow = props => {
  const { id } = useParams()
  const [follow, setFollow] = useState([
    {
      id: 0,
      name: '',
      image_path: null,
      description: '',
      is_followed: false
    }
  ])

  useEffect(() => {
    let path = '/api/follower'
    if (props.is_followee) {
      path = '/api/followee'
    }

    axios
      .get(`${path}/${id}`)
      .then(res => {
        setFollow(res.data)
      })
      .catch(err => {
        alert('不明なエラーです。')
      })
  }, [id, props.isFollowee, props.is_followee])

  return (
    <Container>
      <Vessel>
        {props.is_followee ? <h1>フォロイー</h1> : <h1>フォロワー</h1>}
        <Card.Group>
          {follow.map(f => {
            const image_file = f.image_path ? f.image_path : 'avator.png'
            return (
              <Card
                key={f.id}
                as={Link}
                to={'/user/' + encodeURIComponent(String(f.id))}
              >
                <Card.Content>
                  <Image
                    floated="right"
                    size="mini"
                    src={'http://localhost:8080/storage/images/' + image_file}
                  />
                  <Card.Header>{f.name}</Card.Header>
                  <Card.Description>{f.description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {f.is_followed && (
                    <>
                      <Icon name="user" />
                      フォローされています
                    </>
                  )}
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
      </Vessel>
    </Container>
  )
}

export default Follow
