/* eslint-env jest */

export function createStorage () {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn()
  }
}
