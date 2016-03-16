import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addNewData } from '../actions'

class InputBox extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (text) {
    const {dispatch, selectedType} = this.props
    dispatch(addNewData(selectedType, text))
  }

  render () {
    let input
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault()
          this.handleSubmit(input.value)
          input.value = ''
        }}>
          <input type='text' ref={(node) => { input = node }} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

InputBox.propTypes = {
  selectedType: PropTypes.string.isRequired
}

export default connect()(InputBox)
