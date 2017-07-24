import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import RaisedButton from 'material-ui/RaisedButton'

@inject('mainStore')
@observer
class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">Loaded with Mobx</p>
      </div>
    )
  }
}

export default App
