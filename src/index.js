import React from 'react'
import { render } from 'react-dom'
import HackerNewsHttpClient from './clients/hacker-news/http'
import Stories from './models/stories'
import StoriesProvider from './providers/stories'
import App from './components/app'
import '../styles/main.css'
import { register as registerServiceWorker } from './offline/register'
import StoryCache from './offline/story-cache'

async function start () {
  registerServiceWorker()

  const client = new HackerNewsHttpClient(
    window.fetch.bind(window),
    'https://hacker-news.firebaseio.com/'
  )

  const cache = new StoryCache(window.localStorage)

  let storiesIds = []

  try {
    storiesIds = await client.getNewStories()
    setTimeout(() => {
      cache.clearUnusedItems(storiesIds)
    }, 1)
  } catch (e) {
    // offline or network connectivity issues
    // retrieves stories from the localStorage cache
    storiesIds = cache.getStories()
  }

  const stories = new Stories(storiesIds)
  const storiesProvider = new StoriesProvider(client, stories, cache)

  const $content = document.getElementById('content')

  render(
    <App
      storiesProvider={storiesProvider}
      cache={cache}
    />,
    $content
  )
}

start().catch(err => console.error(err))
