// import React from 'react'
// import ReactDOM from 'react-dom'

// import 'normalize.css'
// import './assets/css/global.css'

console.log('yo')

function render() {
  const Root = require('./components/misc/Root').default
  ReactDOM.render(
    <Root />,
    document.getElementById('root')
  )
}

render()

if (module.hot) {
  module.hot.accept('./components/misc/Root', () => {
    render()
  })
}