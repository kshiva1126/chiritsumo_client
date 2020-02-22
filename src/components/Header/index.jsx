import React from 'react'
import { Link } from 'react-router-dom'
import Container from './style'
import { Segment, Image } from 'semantic-ui-react'
import { axios } from '../../config/axios'
import Post from '../Post'

const Header = props => {
  const logout = async () => {
    await axios
      .post('/api/logout')
      .then(res => {
        window.location.href = '/login'
      })
      .catch(err => {
        alert('不明なエラーです。')
      })
  }
  const image_file = props.image_path ? props.image_path : 'avator.png'
  return (
    <Container>
      <Segment>
        <div className="header">
          <div className="title">
            <Link to="/home">Chiritsumo</Link>
          </div>
          {props.auth && (
            <Link to={'/user/' + encodeURIComponent(String(props.user_id))}>
              <Image
                circular
                size="mini"
                floated="right"
                src={'http://localhost:8080/storage/images/' + image_file}
              />
            </Link>
          )}
          <div className="nav">
            <ul>
              <li>
                {props.auth ? <Post /> : <Link to="/login">ログイン</Link>}
              </li>
              <li>
                {props.auth ? (
                  <span className="link" onClick={logout}>
                    ログアウト
                  </span>
                ) : (
                  <Link to="/register">会員登録</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </Segment>
    </Container>
  )
}

export default Header
