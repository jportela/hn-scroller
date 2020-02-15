/* eslint-env jest */

import createFetch from '../../mocks/fetch'
import HackerNewsHttpClient from '../../../src/clients/hacker-news/http'

const fetch = createFetch([])

const client = new HackerNewsHttpClient(fetch, 'test')

test('it calls getNewStories()', async () => {
  await client.getNewStories()
  expect(fetch).toHaveBeenCalled()
})

test('it calls getItem()', async () => {
  await client.getItem()
  expect(fetch).toHaveBeenCalled()
})
