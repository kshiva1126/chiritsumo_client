import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router'

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

import useAuth from './utils/useAuth'

function App() {
  const [auth, user] = useAuth()

  return (
    <>
      <Header auth={auth} user_id={user.id} image_path={user.image_path} />
      {auth ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/user/:id" component={User} />
          <Route path="/post/:id" component={Detail} />
          <Route path="/profile" component={Profile} />
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
          <Route path="/user/:id" component={User} />
          <Redirect to="/login" />
        </Switch>
      )}
    </>
  )
}

export default App
