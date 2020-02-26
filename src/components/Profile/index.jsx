import React, { useState, useEffect } from 'react'
import Container from './style'
import { axios } from '../../utils/axios'
import { Input, Button, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import useAuth from '../../utils/useAuth'

const Profile = () => {
  const [auth, loginUser] = useAuth()

  const [user, setUser] = useState({
    name: '',
    email: '',
    image: null,
    description: ''
  })

  useEffect(() => {
    setUser({
      ...loginUser
    })
  }, [loginUser])

  const [errors, setErrors] = useState({})

  const [isErr, setIsErr] = useState({
    name: false,
    email: false
  })

  const [errMsgs, setErrMsgs] = useState({
    name: '',
    email: '',
    description: ''
  })

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === 'file' ? target.files[0] : target.value
    const name = target.name
    setUser({ ...user, [name]: value })
  }

  const resetErr = () => {
    setIsErr({
      name: false,
      email: false
    })
    setErrMsgs({
      name: '',
      email: '',
      description: ''
    })
  }

  const profile = async () => {
    resetErr()
    const data = new FormData()
    data.append('name', user.name)
    data.append('email', user.email)
    data.append('image', user.image)
    data.append('description', user.description || '')

    await axios
      .post(`https://kshiva1126.com/chiritsumo/server/api/profile/`, data)
      .then(res => {
        window.location.href = '/home'
      })
      .catch(err => {
        const status = err.response.status
        if (status !== 422) {
          window.location.href = '/login'
        }
        const errors = err.response.data.errors
        if (errors) {
          setErrors(errors)
        }
      })
  }

  useEffect(() => {
    for (let name in errors) {
      setIsErr(isErr => {
        return {
          ...isErr,
          [name]: true
        }
      })
      setErrMsgs(errMsgs => {
        return {
          ...errMsgs,
          [name]: errors[name][0]
        }
      })
    }
  }, [errors])

  return (
    <Container>
      <div className="form">
        <h1>プロフィール</h1>
        <Link to="/password">パスワード変更はこちらから</Link>
        <div className="field-wrap">
          <Input
            name="name"
            placeholder="ユーザ名"
            defaultValue={user.name}
            onChange={handleInputChange}
            error={isErr.name}
          />
          <span className="err-msg">{errMsgs.name}</span>
        </div>
        <div className="field-wrap">
          <Input
            name="email"
            placeholder="メールアドレス"
            defaultValue={user.email}
            onChange={handleInputChange}
            error={isErr.email}
          />
          <span className="err-msg">{errMsgs.email}</span>
        </div>
        <div className="field-wrap">
          <input
            type="file"
            id="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
        <div className="field-wrap">
          <TextArea
            name="description"
            placeholder="自己紹介"
            value={user.description}
            onChange={handleInputChange}
          />
          <span className="err-msg">{errMsgs.description}</span>
        </div>
        <Button type="button" onClick={profile}>
          編集する
        </Button>
      </div>
    </Container>
  )
}

export default Profile
