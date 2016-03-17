import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputBox from '../components/InputBox'
import { addNewData } from '../actions'

class AddNewData extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (text) {
    const {dispatch, selectedReddit} = this.props
    dispatch(addNewData(selectedReddit, text))
  }

  render () {
    return (<InputBox onSubmit={this.handleSubmit} />)
  }
}

let mapStateToProps = (state) => {
  return {
    selectedReddit: state.selectedReddit
  }
}

let mapDispatchToProps = (dispatch) => {
  return {dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewData)
