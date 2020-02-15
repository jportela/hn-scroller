/* eslint-env jest */

import Stories from '../../src/models/stories'

const stories = new Stories([1, 2, 3, 5, 8, 13, 21, 34, 55])

test('adds and retrieves a story payload', () => {
  expect(stories.stories.length === 0)
  stories.addStory({ id: 13, test: 100 })
  expect(stories.stories.length === 1)
  const story = stories.getStory(13)
  expect(story.id).toBe(13)
  expect(story.test).toBe(100)
})

test('gets first 2 storiesIds', () => {
  expect(stories.getNewStoryIds(0, 2)).toEqual([1, 2])
})

test('gets next 2 storiesIds', () => {
  expect(stories.getNewStoryIds(2, 2)).toEqual([3, 5])
})

test('gets next 10 storiesIds', () => {
  expect(stories.getNewStoryIds(4, 10)).toEqual([8, 13, 21, 34, 55])
})
