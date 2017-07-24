import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import logo from './logo.svg';
// import './App.css';
import RaisedButton from 'material-ui/RaisedButton'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import mainStore from './MainStore'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import Home from './Home'

const homeScreen = ({ location }) =>
  <div>
    <Home mainStore={mainStore} />
  </div>

const About = () =>
  <div>
    <h2>About</h2>
  </div>

@observer
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }

    this.handler = this.handler.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount() {
    console.log('mount')
  }

  handler() {
    this.setState({ open: !this.state.open })
  }

  handleClose() {
    this.setState({ open: false })
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div className="App">
            <AppBar
              title="Playground"
              onLeftIconButtonTouchTap={this.handler}
              onTitleTouchTap={this.handler}
              showMenuIconButton
            />
            <Drawer
              docked={false}
              onRequestChange={open => this.setState({ open })}
              width={200}
              open={this.state.open}
            >
              <div style={{ paddingTop: 20 }}>
                <ul>
                  <li>
                    <Link onClick={this.handleClose} to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link onClick={this.handleClose} to="/about">
                      About
                    </Link>
                  </li>
                </ul>
              </div>
            </Drawer>

            <Route exact path="/" component={homeScreen} />
            <Route path="/about" component={About} />
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
