import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action, autorun } from 'mobx'
import RaisedButton from 'material-ui/RaisedButton'

import autobind from 'autobind-decorator'
import Rx from 'rxjs/Rx'
import mobxutils, { toStream } from 'mobx-utils'
Rx.Observable.of('hello world').subscribe(function(x) {
  console.log(x)
})

async function startFetch(term) {
  // let term = 'ava'
  console.log('fetching...', term)
  let url = `https://api.github.com/search/repositories?q=${term}`
  let res = await fetch(url)
  let json = await res.json()
  // console.log('json', json)
  return json
}

@inject('mainStore')
@observer
class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    Rx.Observable
      .fromEvent(this.c, 'click')
      .subscribe(() => console.log('Clicked!'))

    this.user = observable({
      firstName: 'C.S',
      lastName: 'Lewis'
    })

    // var disposer = autorun(() => console.log(this.user.firstName))

    Rx.Observable
      .from(
        toStream(() => {
          console.log('did change?')
          return this.user.firstName
        })
      )
      .map(x => {
        console.log('x', x)
        return x
      })
      //   .scan(nameChanges => nameChanges + 1, 0)
      // .scan(nameChanges => {
      //   console.log('how', nameChanges)
      //   return 'greatness uper'
      // })
      .subscribe(nameChanges =>
        console.log('Changed name ', nameChanges, 'times')
      )

    this.user.firstName = 'cool'
    this.user.lastName = 'great'

    Rx.Observable
      .fromEvent(this.inputBox, 'keyup')
      .map(x => {
        // console.log(x.target.value, x)
        return x.target.value
      })
      .filter(val => val.length > 2)
      .debounce(() => Rx.Observable.timer(2000)) /* debounce it */
      .distinctUntilChanged()
      .switchMap(startFetch) //use instead of flatmap
      .subscribe(x => console.log('key up!', x))
  }

  @autobind
  click() {
    let term = 'ava'
    let url = `https://api.github.com/search/repositories?q=${term}`

    this.user.firstName = 'whohoho' + new Date().getTime().toString()
    this.user.lastName = new Date().getTime().toString()

    // startFetch().then(json => console.log(json, json))
    // fetch(url)
    //   .then(res => {
    //     return res.json()
    //   })
    //   .then(data => {
    //     console.log('hello yu', data)
    //   })
    //   .catch(e => {
    //     console.log('err', e)
    //   })
    // console.log('hello', this.c)
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">Loaded with Mobx</p>
        <button ref={c => (this.c = c)}>Hello</button>
        <input ref={c => (this.inputBox = c)} type="text" defaultValue="" />
        <RaisedButton onTouchTap={this.click} label="submit" primary />
      </div>
    )
  }
}

export default App
