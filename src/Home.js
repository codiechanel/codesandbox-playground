import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import RaisedButton from 'material-ui/RaisedButton'

@inject('mainStore')
@observer
class App extends React.Component {
  constructor(props) {
    super(props)

    this.handleTap = this.handleTap.bind(this)
  }
  handleTap() {
    console.log('handleTap')
    let timestamp = new Date().getTime().toString()
    this.props.mainStore.add(timestamp)
    // this.person.name = timestamp
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <b>
            map size: {this.props.mainStore.timestamps.size}
          </b>
        </p>
        <RaisedButton
          style={{ margin: 15 }}
          onTouchTap={this.handleTap}
          label="Mobx from Home component"
        />
      </div>
    )
  }
}

export default App
