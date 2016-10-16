import React from 'react'
import ReactDOM from 'react-dom'

// import 'normalize.css'
// import './assets/css/global.css'
import configureStore from './redux/store/configureStore'

console.log('yo')
const store = configureStore()

// let homeState = { name: 'home', url: '/home',  component: () => <p>hi</p> };

//   const router = new UIRouterReact();
//   router.stateRegistry.register(homeState);

//   router.start()

function render() {
  const Root = require('./components/misc/Root').default
  ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
  )
}

render()

if (module.hot) {
  module.hot.accept('./components/misc/Root', () => {
    render()
  })
}