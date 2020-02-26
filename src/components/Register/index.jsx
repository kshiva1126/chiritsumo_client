import React, { useState, useEffect } from 'react'
import Container from './style'
import { axios } from '../../utils/axios'
import { Input, Button, TextArea } from 'semantic-ui-react'

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
    description: ''
  })

  const [errors, setErros] = useState({})

  const [isErr, setIsErr] = useState({
    name: false,
    email: false,
    password: false,
    description: false
  })

  const [errMsgs, setErrMsgs] = useState({
    name: '',
    email: '',
    password: '',
    description: ''
  })

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === 'file' ? target.files[0] : target.value
    const name = target.name
    setValues({ ...values, [name]: value })
  }

  const resetErr = () => {
    setIsErr({
      name: false,
      email: false,
      password: false,
      description: false
    })
    setErrMsgs({
      name: '',
      email: '',
      password: '',
      description: ''
    })
  }

  const register = async () => {
    resetErr()
    const data = new FormData()
    data.append('name', values.name)
    data.append('email', values.email)
    data.append('password', values.password)
    data.append('image', values.image)
    data.append('description', values.description)

    await axios
      .post('https://kshiva1126.com/chiritsumo/server/api/register', data)
      .then(() => {
        window.location.href = '/home'
      })
      .catch(err => {
        const errors = err.response.data.errors
        setErros(errors)
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
        <h1>会員登録</h1>
        <div className="field-wrap">
          <Input
            name="name"
            placeholder="ユーザ名"
            defaultValue={values.name}
            onChange={handleInputChange}
            error={isErr.name}
          />
          <span className="err-msg">{errMsgs.name}</span>
        </div>
        <div className="field-wrap">
          <Input
            name="email"
            placeholder="メールアドレス"
            defaultValue={values.email}
            onChange={handleInputChange}
            error={isErr.email}
          />
          <span className="err-msg">{errMsgs.email}</span>
        </div>
        <div className="field-wrap">
          <Input
            type="password"
            name="password"
            placeholder="パスワード"
            defaultValue={values.password}
            onChange={handleInputChange}
            error={isErr.password}
          />
          <span className="err-msg">{errMsgs.password}</span>
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
            value={values.description}
            onChange={handleInputChange}
            error={isErr.description}
          />
          <span className="err-msg">{errMsgs.description}</span>
        </div>
        <Button type="button" onClick={register}>
          登録する
        </Button>
      </div>
    </Container>
  )
}

export default Register
