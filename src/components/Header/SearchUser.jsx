import React, { useState } from 'react'
import { Input, Segment, Card } from 'semantic-ui-react'

const SearchUser = () => {
  const [keyword, setKeyword] = useState('')
  const [searchUsers, setSearchUsers] = useState([
    {
      id: 0,
      name: 'hoge'
    },
    {
      id: 1,
      name: 'fuga'
    }
  ])

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value

    setKeyword(value)
  }

  const search = () => {
    console.log(keyword)
  }

  return (
    <>
      <Input
        icon="users"
        iconPosition="left"
        placeholder="ユーザ検索"
        defaultValue={keyword}
        onChange={handleInputChange}
      />
      {keyword !== '' && (
        <div>
          {searchUsers.map(s => (
            <div key={s.id}>
              <a href="">
                <Card content={s.name} />
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SearchUser
