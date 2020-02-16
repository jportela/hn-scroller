/**
 * Observer pattern
 */
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

  // broadcasts to all listeners
  fire (payload) {
    this.listeners.forEach(listener => listener(payload))
  }
}
