import { observable, action } from 'mobx'
class Store {
  @observable groups = new Map()
  @observable filter = ''
  @observable loaded = false

  @action
  add(item) {
    this.groups.set(item, item)
  }
}
const store = new Store()
export default store
