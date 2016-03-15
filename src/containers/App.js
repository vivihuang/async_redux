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
   dispatch(fetchRedditData(this.props.selectedReddit))
  }

  handleChange(value) {
    const {dispatch} = this.props
    dispatch(fetchRedditData(value))
  }

  render() {
    let {items} = this.props
    return (
      <div>
        <select defaultValue='reactjs' onChange={e => this.handleChange(e.target.value)}>
          <option value='reactjs'>React</option>
          <option value='frontend'>Frontend</option>
        </select>
        {_.isEmpty(items) ? (<div><h2>Loading...</h2></div>) : (<Record records={items.data.children} />)}
      </div>
    )
  }
}

let mapStateToProps = (state) => { return {
  items: state.fetchData,
  selectedReddit: state.selectedReddit
} }

let mapDispatchToProps = (dispatch) => { return {dispatch} }

App = connect(mapStateToProps, mapDispatchToProps)(App)
export default App
