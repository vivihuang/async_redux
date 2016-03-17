import React, { Component, PropTypes } from 'react'

class InputBox extends Component {
  render () {
    let input
    return (
      <form onSubmit={(e) => {
        e.preventDefault()
        this.props.onSubmit(input.value)
        input.value = ''
      }}>
        <input type='text' ref={(node) => { input = node }} />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

InputBox.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default InputBox
