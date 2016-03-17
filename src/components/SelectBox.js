import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

class SelectBox extends Component {
  render () {
    let {onChange, value, options} = this.props
    return (
      <select defaultValue={value} onChange={(e) => {
        e.preventDefault()
        onChange(e.target.value)
      }}>
        {_.map(options, (item, index) => { return (<option key={index} value={item}>{item}</option>) })}
      </select>
    )
  }
}

SelectBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectBox
