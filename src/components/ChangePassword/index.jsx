import React, { useState, useEffect } from 'react'
import { axios } from '../../utils/axios'
import Container from './style'
import { Input, Button } from 'semantic-ui-react'

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    old: '',
    new: ''
  })

  const [errors, setErrors] = useState({})

  const [isErr, setIsErr] = useState({
    old: false,
    new: false
  })

  const [errMsgs, setErrMsgs] = useState({
    old: '',
    new: ''
  })

  const handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    setPasswords({ ...passwords, [name]: value })
  }

  const resetErr = () => {
    setIsErr({
      old: false,
      new: false
    })
    setErrMsgs({
      old: '',
      new: ''
    })
  }

  const change_password = async () => {
    resetErr()
    const data = new FormData()
    data.append('old', passwords.old)
    data.append('new', passwords.new)

    await axios
      .post('https://kshiva1126.com/chiritsumo/server/api/password/change', data)
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
        <h1>パスワード変更</h1>
        <div className="field-wrap">
          <Input
            type="password"
            name="old"
            placeholder="現在のパスワードを入力してください"
            onChange={handleInputChange}
            error={isErr.old}
          />
          <span className="err-msg">{errMsgs.old}</span>
        </div>
        <div className="field-wrap">
          <Input
            type="password"
            name="new"
            placeholder="新しいパスワードを入力してください"
            onChange={handleInputChange}
            error={isErr.new}
          />
          <span className="err-msg">{errMsgs.new}</span>
        </div>
        <Button type="button" onClick={change_password}>
          変更する
        </Button>
      </div>
    </Container>
  )
}

export default ChangePassword
