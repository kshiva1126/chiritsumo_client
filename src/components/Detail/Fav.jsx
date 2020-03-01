import React, { useState, useEffect } from 'react'
import { Rating } from 'semantic-ui-react'
import { axios } from '../../utils/axios'

const Fav = props => {
  const [favo, setFavo] = useState(0)

  useEffect(() => {
    axios
      .get(
        'https://kshiva1126.com/chiritsumo/server/api/post/fav/' +
          encodeURIComponent(String(props.post_id))
      )
      .then(res => {
        if (res.data.is_favorite === true) {
          setFavo(1)
        }
      })
      .catch(err => {
        alert('不明なエラーです。')
      })
  }, [favo, props.post_id])

  const fav = async () => {
    await axios
      .post('https://kshiva1126.com/chiritsumo/server/api/fav', {
        post_id: props.post_id
      })
      .then(res => {
        const rating = res.data.is_delete_favo === true ? 0 : 1
        setFavo(rating)
      })
      .catch(err => {
        const status = err.response.status
        if (status !== 422) {
          window.location.href = '/login'
        }
      })
  }

  return <Rating id="favorite" icon="heart" rating={favo} onRate={fav} />
}

export default Fav
