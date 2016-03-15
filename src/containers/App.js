import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchRedditData, selectType } from '../actions'
import Record from '../components/Record'
import SelectBox from '../components/SelectBox'

class App extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  componentWillMount () {
    const {dispatch} = this.props
    dispatch(fetchRedditData(this.props.selectedReddit))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch } = this.props
      dispatch(fetchRedditData(nextProps.selectedReddit))
    }
  }

  handleChange (value) {
    const {dispatch} = this.props
    dispatch(selectType(value))
  }

  handleRefresh (event) {
    event.preventDefault()
    const {dispatch} = this.props
    dispatch(fetchRedditData(this.props.selectedReddit))
  }

  render () {
    let {items, refreshTime, selectedReddit} = this.props
    return (
      <div>
        <h2>{selectedReddit}</h2>
        <SelectBox onChange={this.handleChange} options={['book', 'film']} value={selectedReddit} />
        <div>
          <p>Last updated at {new Date(refreshTime).toLocaleTimeString()}
            {'  '}
            <button onClick={this.handleRefresh}>Refresh</button>
          </p>
        </div>
        {_.isEmpty(items) ? (<div><h2>Loading...</h2></div>) : (<Record records={items.data.children} />)}
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    items: state.fetchData.data,
    refreshTime: state.fetchData.time,
    selectedReddit: state.selectedReddit
  }
}

let mapDispatchToProps = (dispatch) => { return {dispatch} }

export default connect(mapStateToProps, mapDispatchToProps)(App)
