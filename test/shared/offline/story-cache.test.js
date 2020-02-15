/* eslint-env jest */

import { createStorage } from '../../mocks/storage'
import StoryCache from '../../../src/offline/story-cache'

const storage = createStorage()

const storyCache = new StoryCache(storage)

test('adds item', () => {
  storyCache.add({ id: 1 })
  expect(storage.setItem).toHaveBeenCalledWith(
    'story-1',
    JSON.stringify({ id: 1 })
  )
})

test('gets item', () => {
  storage.getItem.mockReturnValue(
    JSON.stringify({ id: 2 })
  )
  expect(storyCache.get(2)).toEqual({ id: 2 })
})

test('clears unused items', () => {
  // storage.setItem.clearMock()
  storage.getItem.mockReturnValue(
    JSON.stringify([1, 3, 5, 7])
  )
  storyCache.clearUnusedItems([1, 2, 3])
  expect(storage.setItem).toHaveBeenCalledWith(
    'stories',
    JSON.stringify([1, 2, 3])
  )
  expect(storage.removeItem).toHaveBeenCalledTimes(2)
  expect(storage.removeItem).toHaveBeenNthCalledWith(1, 'story-5')
  expect(storage.removeItem).toHaveBeenNthCalledWith(2, 'story-7')
})
