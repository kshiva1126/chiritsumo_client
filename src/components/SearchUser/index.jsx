import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Container as Vessel,
  Card,
  Image,
  Icon,
  Input
} from 'semantic-ui-react'
import Container from './style'
import { axios } from '../../utils/axios'

const SearchUser = () => {
  const [searchUsers, setSearchUsers] = useState([
    {
      id: 0,
      name: '',
      image_path: null,
      description: '',
      is_followed: false
    }
  ])
  const [keyword, setKeyword] = useState('')

  async function search_user(value) {
    await axios
      .post('https://kshiva1126.com/chiritsumo/server/api/user/search', {
        keyword: value
      })
      .then(res => {
        setSearchUsers(res.data)
      })
      .catch(err => {
        alert('不明なエラーです。')
      })
  }

  const handleInputChange = async event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    setKeyword(value)
    await search_user(value)
  }

  return (
    <Container>
      <Vessel>
        <div className="input-wrap">
          <Input
            icon="users"
            iconPosition="left"
            placeholder="ユーザ検索"
            defaultValue={keyword}
            onChange={handleInputChange}
          />
        </div>
        <h1>検索結果</h1>
        <Card.Group>
          {keyword &&
            (searchUsers.length > 0
              ? searchUsers.map(su => {
                  const image_file = su.image_path
                    ? su.image_path
                    : 'avator.png'
                  return (
                    <Card
                      key={su.id}
                      as={Link}
                      to={'/user/' + encodeURIComponent(String(su.id))}
                    >
                      <Card.Content>
                        <Image
                          floated="right"
                          size="mini"
                          src={
                            'https://kshiva1126.com/chiritsumo/server/storage/images/' +
                            image_file
                          }
                        />
                        <Card.Header>{su.name}</Card.Header>
                        <Card.Description>{su.description}</Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        {su.is_followed && (
                          <>
                            <Icon name="user" />
                            フォローされています
                          </>
                        )}
                      </Card.Content>
                    </Card>
                  )
                })
              : '見つかりませんでした')}
        </Card.Group>
      </Vessel>
    </Container>
  )
}

export default SearchUser
