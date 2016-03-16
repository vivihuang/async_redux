import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { deleteData } from '../actions'

class Record extends Component {
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleModify = this.handleModify.bind(this)
  }

  handleDelete (id) {
    const {dispatch, selectedType} = this.props
    dispatch(deleteData(selectedType, id))
  }

  handleModify () {

  }

  render () {
    let linkStyle = {
      textDecoration: 'underline',
      color: 'blue',
      cursor: 'pointer'
    }
    return (
      <div>
        <ul>
          {_.map(this.props.records, (item, index) => {
            return (
              <li key={index}>
                <p>{item.title}
                  {'  '}
                  <a onClick={(e) => {
                    e.preventDefault()
                    this.handleDelete(item.id)
                  }} style={linkStyle}>删除</a>
                  {'  '}
                  <a onClick={this.handleModify} style={linkStyle}>修改</a>
                </p>
              </li>)
          })}
        </ul>
      </div>
    )
  }
}

Record.propTypes = {
  records: PropTypes.array.isRequired,
  selectedType: PropTypes.string.isRequired
}

export default connect()(Record)
