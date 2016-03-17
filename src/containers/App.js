import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchRedditData, selectType } from '../actions'
import Record from './Record'
import AddNewData from './AddNewData'
import SelectBox from '../components/SelectBox'
import RefreshBox from '../components/RefreshBox'

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
    const {dispatch} = this.props
    dispatch(fetchRedditData(this.props.selectedReddit))
  }

  render () {
    let {items, refreshTime, selectedReddit} = this.props
    let records = _.isEmpty(items)
      ? (<div><h2>Loading...</h2></div>)
      : (<Record records={items.data.children} selectedType={selectedReddit} />)

    return (
      <div>
        <h2>{selectedReddit}</h2>
        <SelectBox onChange={this.handleChange} options={['book', 'film']} value={selectedReddit} />
        <RefreshBox onClick={this.handleRefresh} refreshTime={refreshTime} />
        {records}
        <AddNewData />
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
