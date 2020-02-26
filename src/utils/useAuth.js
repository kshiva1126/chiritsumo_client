import React, { useState, useEffect } from 'react'
import { axios } from './axios'

function useAuth() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    image_path: '',
    description: ''
  })

  const auth_check = async () => {
    axios
      .get('https://kshiva1126.com/chiritsumo/server/api/auth_check')
      .then(res => {
        setAuth(res.data.auth)
        setUser(res.data.user)
      })
  }

  useEffect(() => {
    ;(async () => {
      await auth_check()
    })()
  }, [])

  return [auth, user]
}

export default useAuth
