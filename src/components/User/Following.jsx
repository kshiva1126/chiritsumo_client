import React, { useState, useEffect } from 'react'
import { axios } from '../../config/axios'

const Following = props => {
  const [isFollow, setFollow] = useState(false)

  useEffect(() => {
    axios
      .get('/api/following/' + encodeURIComponent(String(props.user_id)))
      .then(res => {
        if (res.data.is_following === true) {
          setFollow(true)
        }
      })
      .catch(err => {
        const status = err.response.status
        if (status !== 422) {
          window.location.href = '/login'
        }
      })
  }, [props.user_id])

  const follow = async () => {
    await axios
      .post(`/api/following/`, { following_user_id: props.user_id })
      .then(res => {
        setFollow(!isFollow)
      })
      .catch(err => {
        const status = err.response.status
        if (status !== 422) {
          window.location.href = '/login'
        }
      })
  }

  return <div onClick={follow}>{isFollow ? 'フォロー中' : 'フォローする'}</div>
}

export default Following
