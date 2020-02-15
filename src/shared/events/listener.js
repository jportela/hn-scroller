export default class EventListener {
  constructor () {
    this.listeners = new Set()
  }

  registerListener (listener) {
    this.listeners.add(listener)
  }

  removeListener (listener) {
    this.listeners.delete(listener)
  }

  fire (payload) {
    this.listeners.forEach(listener => listener(payload))
  }
}
