import React, { Component, PropTypes } from 'react'

class RefreshBox extends Component {
  render () {
    let {onClick, refreshTime} = this.props
    return (
      <div>
        <p>Last updated at {new Date(refreshTime).toLocaleTimeString()}
          {'  '}
          <button onClick={(e) => {
            e.preventDefault()
            onClick()
          }}>Refresh</button>
        </p>
      </div>
    )
  }
}

RefreshBox.propTypes = {
  onClick: PropTypes.func.isRequired,
  refreshTime: PropTypes.number.isRequired
}

export default RefreshBox
