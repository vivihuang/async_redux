import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

class SelectBox extends Component {
  render () {
    return (
      <select defaultValue={this.props.value} onChange={(e) => this.props.onChange(e.target.value)}>
        {_.map(this.props.options, (item, index) => { return (<option key={index} value={item}>{item}</option>) })}
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
