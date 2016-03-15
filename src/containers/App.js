import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchRedditData } from '../actions'
import Record from '../components/Record'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
   const {dispatch} = this.props
   dispatch(fetchRedditData())
  }

  render() {
    let {items} = this.props
    return _.isEmpty(items)
      ? (<div><h2>Loading...</h2></div>)
      : (<div><Record records={items.data.children} /></div>)
  }
}

let mapStateToProps = (state) => { return {items: state} }

let mapDispatchToProps = (dispatch) => { return {dispatch} }

App = connect(mapStateToProps, mapDispatchToProps)(App)
export default App
