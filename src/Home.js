import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable, action, autorun } from 'mobx'
import RaisedButton from 'material-ui/RaisedButton'
import AutoComplete from 'material-ui/AutoComplete'
import autobind from 'autobind-decorator'
import Rx from 'rxjs'
import mobxutils, { toStream } from 'mobx-utils'

async function startFetch(term) {
  // let term = 'ava'
  console.log('fetching...', term)
  let url = `https://api.github.com/search/repositories?q=${term}`
  let res = await fetch(url)
  let json = await res.json()
  // console.log('json', json)
  return json
}

function fetchy(term) {
  let url = `https://api.github.com/search/repositories?q=${term}`
  fetch(url)
    .then(res => {
      return res.json()
    })
    // .then(data => {
    //   console.log('hello yu', data)
    //   return data
    // })
    .catch(e => {
      console.log('err', e)
    })
}

@inject('mainStore')
@observer
class App extends React.Component {
  state = {
    dataSource: [],
    map: new Map()
  }
  // constructor(props) {
  //   super(props)
  // }

  handleUpdateInput = value => {
    this.user.firstName = value
    // this.setState({
    //   dataSource: [value, value + value, value + value + value]
    // })
  }

  componentDidMount() {
    this.user = observable({
      firstName: 'C.S'
    })

    // var disposer = autorun(() => console.log(this.user.firstName))

    Rx.Observable
      .from(
        toStream(() => {
          return this.user.firstName
        })
      )
      // .map(x => {
      //   console.log('x', x)
      //   return x
      // })
      //   .scan(nameChanges => nameChanges + 1, 0)
      // .scan(nameChanges => {
      //   console.log('how', nameChanges)
      //   return 'greatness uper'
      // })
      // .subscribe(nameChanges =>
      //   console.log('Changed name ', nameChanges, 'times')
      // )
      .filter(val => val.length > 2)
      // .map(term => {
      //   let url = `https://api.github.com/search/repositories?q=${term}`
      //   return url
      // })
      .debounce(() => Rx.Observable.timer(2000)) /* debounce it */
      .distinctUntilChanged()
      .switchMap(startFetch)
      // .switchMap(term => {
      //   console.log('the term')
      //   let url = `https://api.github.com/search/repositories?q=${term}`
      //   return fetch(url).then(res => res.json())
      // }) 
      //use instead of flatmap
      // .map(res => res.json())
      .subscribe(x => {
        console.log('wow!', x)
        let arr = []
        let map = new Map()
        x.items.forEach(o => {
          // arr.push(o.name)
          // arr.push(o.full_name)
          this.state.map.set(o.name, o.name)
          this.state.map.set(o.full_name, o.full_name)
        })
        this.setState({
          dataSource: Array.from(this.state.map.values())
        })
      })

    // Rx.Observable
    //   .fromEvent(this.inputBox, 'keyup')
    //   .map(x => {
    //     // console.log(x.target.value, x)
    //     return x.target.value
    //   })
    //   .filter(val => val.length > 2)
    //   .debounce(() => Rx.Observable.timer(2000)) /* debounce it */
    //   .distinctUntilChanged()
    //   .switchMap(startFetch) //use instead of flatmap
    //   .subscribe(x => console.log('key up!', x))
  }

  @autobind
  click() {}

  render() {
    return (
      <div>
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">Loaded with Mobx</p>
        <AutoComplete
          hintText="Type anything"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
        />

        {/* <input ref={c => (this.inputBox = c)} type="text" defaultValue="" /> */}
      </div>
    )
  }
}

export default App
