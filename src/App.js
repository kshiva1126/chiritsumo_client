import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { axios } from './config/axios'

import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import User from './components/User'
import Detail from './components/Detail'
import Profile from './components/Profile'
import Follow from './components/Follow'
import Favorite from './components/Favorite'
import ChangePassword from './components/ChangePassword'

function App() {
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
      .catch(err => {
        alert('不明なエラーです。')
      })
  }

  useEffect(() => {
    ;(async () => {
      await auth_check()
    })()
  }, [])

  return (
    <>
      <Header auth={auth} user_id={user.id} image_path={user.image_path} />
      {auth ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Route
            path="/user/:id"
            render={props => <User user_id={user.id} auth={auth} />}
          />
          <Route
            path="/post/:id"
            render={props => <Detail user_id={user.id} user_name={user.name} />}
          />
          <Route
            path="/profile"
            render={props => (
              <Profile
                auth={auth}
                user_id={user.id}
                user_name={user.name}
                user_email={user.email}
                user_description={user.description}
              />
            )}
          />
          <Route
            exact
            path="/followee/:id"
            render={props => <Follow is_followee={true} user_id={user.id} />}
          />
          <Route
            exact
            path="/follower/:id"
            render={props => <Follow is_followee={false} />}
          />
          <Route path="/favorite/:id" component={Favorite} />
          <Route path="/password/" component={ChangePassword} />
          <Redirect to="/home" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route
            path="/user/:id"
            render={props => <User user_id={user.id} />}
          />
          <Route
            path="/post/:id"
            render={props => <Detail user_id={user.id} user_name={user.name} />}
          />
          <Redirect to="/login" />
        </Switch>
      )}
    </>
  )
}

export default App
