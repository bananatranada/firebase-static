import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import DevTools from './DevTools'
import routes from '../../config/routes'

class Root extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const history = syncHistoryWithStore(browserHistory, this.props.store)

    return (
      <Provider store={this.props.store}>
        <div>
          <DevTools />
          <Router routes={routes()} history={history} />
        </div>
      </Provider>
    )
  }
}

Root.proptypes = {}
Root.defaultProps = {}

export default Root
