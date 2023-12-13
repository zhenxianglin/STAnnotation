import React from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, {persistor} from './redux/store'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)