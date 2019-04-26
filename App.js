import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import AppMain from './src'

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <AppMain />
        </Provider>
    )
  }
}