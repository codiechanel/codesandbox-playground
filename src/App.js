import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import logo from './logo.svg';
import './App.css'
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

// center all child
const demoScreen1 = () =>
  <div
    style={{
      display: 'flex',
      flex: 0.75,
      flexDirection: 'column',
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <RaisedButton label="demoScreen1" primary />

    <RaisedButton label="demoScreen1" primary />
  </div>

// equal spacing between elements
const demoScreen2 = () =>
  <div
    style={{
      display: 'flex',
      flex: 0.75,
      padding: 15,
      flexDirection: 'row',
      backgroundColor: 'gray',
      justifyContent: 'space-around',
      alignItems: 'flex-start'
    }}
  >
    <RaisedButton label="demoScreen2" primary />

    <RaisedButton label="demoScreen2" primary />
  </div>

// this makes elements apart
const demoScreen2a = () =>
  <div
    style={{
      display: 'flex',
      flex: 0.75,
      padding: 15,
      flexDirection: 'row',
      backgroundColor: 'gray',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }}
  >
    <RaisedButton label="demoScreen2" primary />

    <RaisedButton label="demoScreen2" primary />
  </div>

// the same as above, but now they start from the bottom
const demoScreen3 = () =>
  <div
    style={{
      display: 'flex',
      flex: 0.75,
      padding: 15,
      flexDirection: 'row',
      backgroundColor: 'gray',
      justifyContent: 'space-around',
      alignItems: 'flex-end'
    }}
  >
    <RaisedButton label="demoScreen3" primary />

    <RaisedButton label="demoScreen3" primary />
  </div>

// the same as above, but now they are at the middle
const demoScreen3a = () =>
  <div
    style={{
      display: 'flex',
      flex: 0.75,
      padding: 15,
      flexDirection: 'row',
      backgroundColor: 'gray',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}
  >
    <RaisedButton label="demoScreen3a" primary />

    <RaisedButton label="demoScreen3a" primary />
  </div>

// here we align all items to the right, from top to bottom
const demoScreen4 = () =>
  <div
    style={{
      display: 'flex',
      flex: 0.75,
      padding: 15,
      flexDirection: 'column',
      backgroundColor: 'gray',
      justifyContent: 'flex-start',
      alignItems: 'flex-end'
    }}
  >
    <RaisedButton label="demoScreen4" primary />

    <RaisedButton label="demoScreen4" default />
  </div>

const demoScreen5 = () =>
  <div
    style={{
      display: 'flex',
      flex: 0.75,
      padding: 15,
      flexDirection: 'row',
      backgroundColor: 'gray',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    }}
  >
    <RaisedButton label="demoScreen5" primary />

    <RaisedButton label="demoScreen5" default />
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
          <div
            style={{
              display: 'flex',
              flex: 1,
              padding: 20,
              flexDirection: 'column',
              backgroundColor: 'blue'
            }}
          >
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
                    <Link onClick={this.handleClose} to="/demo1">
                      Demo1
                    </Link>
                  </li>
                  <li>
                    <Link onClick={this.handleClose} to="/demo2">
                      Demo2
                    </Link>
                  </li>
                  <li>
                    <Link onClick={this.handleClose} to="/demo2a">
                      Demo2a
                    </Link>
                  </li>
                  <li>
                    <Link onClick={this.handleClose} to="/demo3">
                      Demo3
                    </Link>
                  </li>
                  <li>
                    <Link onClick={this.handleClose} to="/demo3a">
                      Demo3a
                    </Link>
                  </li>
                  <li>
                    <Link onClick={this.handleClose} to="/demo4">
                      Demo4
                    </Link>
                  </li>
                  <li>
                    <Link onClick={this.handleClose} to="/demo5">
                      Demo5
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
            <Route exact path="/demo1" component={demoScreen1} />
            <Route exact path="/demo2" component={demoScreen2} />
            <Route exact path="/demo2a" component={demoScreen2a} />
            <Route exact path="/demo3" component={demoScreen3} />
            <Route exact path="/demo3a" component={demoScreen3a} />
            <Route exact path="/demo4" component={demoScreen4} />
            <Route exact path="/demo5" component={demoScreen5} />
            <Route path="/about" component={About} />
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
