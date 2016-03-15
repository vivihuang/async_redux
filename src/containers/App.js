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
    let {items, selectedReddit} = this.props
    return (
      <div>
        <SelectBox onChange={this.handleChange} options={['reactjs', 'frontend']} value={selectedReddit} />
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
