import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

class Record extends Component {
  render() {
    return (
      <ul>
        {_.map(this.props.records, (item, index) => {
          return (<li key={index}>{item.data.title}</li>)
        })}
      </ul>
    )
  }
}

Record.propTypes = {
  records: PropTypes.array.isRequired
}

export default Record
