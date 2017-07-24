import { observable, action } from 'mobx'
class Store {
  @observable timestamps = new Map()
  @observable filter = ''
  @observable loaded = false

  @action
  add(item) {
    console.log('adding...')
    this.timestamps.set(item, item)
  }
}
const store = new Store()
export default store
