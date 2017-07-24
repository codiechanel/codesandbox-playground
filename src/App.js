import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import logo from './logo.svg';
// import './App.css';
import RaisedButton from 'material-ui/RaisedButton'

class App extends React.Component {
  componentDidMount() {
    console.log('mount')
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <h2>Welcome to cool great React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <RaisedButton label="Material UI" />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
