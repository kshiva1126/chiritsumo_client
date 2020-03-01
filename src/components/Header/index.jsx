import React from 'react'
import { Link } from 'react-router-dom'
import Container from './style'
import { Segment, Image, Responsive, Dropdown, Confirm } from 'semantic-ui-react'
import { axios } from '../../utils/axios'
import Post from '../Post'
import { useState } from 'react'

const Header = props => {
  const logout = async () => {
    await axios
      .post('https://kshiva1126.com/chiritsumo/server/api/logout')
      .then(res => {
        window.location.href = '/login'
      })
      .catch(err => {
        alert('不明なエラーです。')
      })
  }
  const image_file = props.image_path ? props.image_path : 'avator.png'
  const [open, setOpen] = useState(false)

  const handleConfirm = res => {
    setOpen(res)
  }

  const [visible, setVisible] = useState(false)

  return (
    <Container>
      <Segment>
        <div className="header">
          <div className="title">
            <Link to="/home">Chiritsumo</Link>
          </div>
          <Responsive minWidth={600}>
            {props.auth && (
              <Link to={'/user/' + encodeURIComponent(String(props.user_id))}>
                <Image
                  circular
                  size="mini"
                  floated="right"
                  src={'https://kshiva1126.com/chiritsumo/server/storage/images/' + image_file}
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
                    <span className="link" onClick={() => handleConfirm(true)}>
                      ログアウト
                    </span>
                  ) : (
                    <Link to="/register">会員登録</Link>
                  )}
                </li>
              </ul>
            </div>
          </Responsive>
          <Responsive maxWidth={599}>
            <div className="menu-wrap">
              <Dropdown
                text='menu'
                button
                floating
              >
                <Dropdown.Menu>
                  {props.auth ? (
                    <>
                      <Dropdown.Item text='マイページ' as={Link} to={'/user/' + encodeURIComponent(String(props.user_id))} />
                      <a role='option' className='item'>
                        <Post />
                      </a>
                      <Dropdown.Item text='ログアウト' onClick={() => handleConfirm(true)} />
                    </>
                  ) : (
                    <>
                      <Dropdown.Item text='ログイン' as={Link} to='/login' />
                      <Dropdown.Item text='会員登録' as={Link} to='/register' />
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Responsive>
          <Confirm
            open={open}
            content='ログアウトしますか？'
            onCancel={() => handleConfirm(false)}
            onConfirm={logout}
          />
        </div>
      </Segment>
    </Container>
  )
}

export default Header
