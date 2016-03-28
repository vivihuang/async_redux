import React, { Component } from 'react'
import { Route, IndexRoute, Link } from 'react-router'
import App from '../containers/App'

const ACTIVE = { color: 'red' }

class SelectLinks extends Component {
  render () {
    return (
      <div>
        <span><Link to='/' activeStyle={ACTIVE}>Homepage</Link></span>
        <span><Link to='/test/users' activeStyle={ACTIVE}>  users</Link></span>
        <span><Link to='/test/users/1' activeStyle={ACTIVE}>  user1</Link></span>
        <span><Link to='/test/about' activeStyle={ACTIVE}>  about</Link></span>
        {this.props.children}
      </div>
    )
  }
}

class Users extends Component {
  render () {
    return (
      <div>
        <h2>Users</h2>
      </div>
    )
  }
}

class User extends Component {
  render () {
    return (
      <div>
        <h3>User {this.props.params.id}</h3>
      </div>
    )
  }
}

class About extends Component {
  render () {
    return (
      <div>
        <h2>About</h2>
      </div>
    )
  }
}

const routes =
  (
  <Route path='/' component={SelectLinks}>
    <IndexRoute component={App}/>
    <Route path='test'>
      <Route path='about' component={About}/>
      <Route path='users'>
        <IndexRoute component={Users}/>
        <Route path=':id' component={User}/>
      </Route>
    </Route>
  </Route>
  )

export default routes
