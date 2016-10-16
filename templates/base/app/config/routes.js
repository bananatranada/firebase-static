import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../components/App'
import Home from '../components/pages/Home'
import NotFoundPage from '../components/pages/NotFoundPage'

function routes() {
  return (
    <div>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </div>
  )
}

export default routes