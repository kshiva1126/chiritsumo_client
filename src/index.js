import React from 'react'
import { render } from 'react-snapshot'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import 'semantic-ui-css/semantic.min.css'

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.unregister()
