import React, { useState, useEffect } from 'react'
import Container from './style'
import { axios } from '../../config/axios'
import { Input, Button } from 'semantic-ui-react'

const Login = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})

  const [isErr, setIsErr] = useState({
    email: false,
    password: false
  })

  const [errMsgs, setErrMsgs] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setValues({ ...values, [name]: value })
  }

  const resetErr = () => {
    setIsErr({
      email: false,
      password: false
    })
    setErrMsgs({
      email: '',
      password: ''
    })
  }

  const login = async () => {
    resetErr()
    const name = values.name
    const email = values.email
    const password = values.password
    const data = { name, email, password }
    await axios
      .post('https://kshiva1126.com/chiritsumo/server/api/login', data)
      .then(res => {
        window.location.href = '/home'
      })
      .catch(err => {
        const errors = err.response.data.errors
        setErrors(errors)
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
        <h1>Chiritsumoにようこそ！</h1>
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
        <Button type="button" onClick={login}>
          ログインする
        </Button>
      </div>
    </Container>
  )
}

export default Login
