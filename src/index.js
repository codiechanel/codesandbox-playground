import React from 'react'
import ReactDOM from 'react-dom'
// import './index.css';
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import injectTapEventPlugin from 'react-tap-event-plugin'

// just to be sure we inject only once
if (!window.injectTapEventPluginFlag) {
  injectTapEventPlugin()
  window.injectTapEventPluginFlag = true
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
