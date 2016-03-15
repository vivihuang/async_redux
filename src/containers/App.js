import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchRedditData } from '../actions'
import Record from '../components/Record'
import SelectBox from '../components/SelectBox'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  componentWillMount() {
    this.handleRefresh()
  }

  handleChange(value) {
    const {dispatch} = this.props
    dispatch(fetchRedditData(value))
  }

  handleRefresh() {
    const {dispatch} = this.props
    dispatch(fetchRedditData(this.props.selectedReddit))
  }

  render() {
    let {items, selectedReddit} = this.props
    return (
      <div>
        <SelectBox onChange={this.handleChange} options={['reactjs', 'frontend']} value={selectedReddit} />
        <button onClick={this.handleRefresh}>Refresh</button>
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
