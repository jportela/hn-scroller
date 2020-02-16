/**
 * Orchestrates population of Stories, retrieving them
 * from the cache, or requesting them to the client
 */

import Story from '../models/story'
import EventListener from '../shared/events/listener'

export default class StoriesProvider {
  constructor (client, stories, cache) {
    this.isFetching = false
    this.newStoryOffset = 0
    this.client = client
    this.cache = cache
    this.stories = stories
    this.storyListener = new EventListener()
  }

  /**
   * Retrieves next {limit} stories
   * Returns a list of storiesIds and queues fetching of the stories
   */
  fetchNextStories (limit) {
    if (this.isFetching) {
      return []
    }
    this.isFetching = true
    const storyIds = this.stories.getNewStoryIds(this.newStoryOffset, limit)

    // this is executed asynchronously
    Promise.all(
      storyIds.map(storyId => this.fetchStory(storyId))
    ).then(() => {
      this.newStoryOffset += storyIds.length
      this.isFetching = false
    }).catch(e => console.error('Could not fetch story:', e))

    return storyIds
  }

  /**
   * Fetches the requested story, from cache or from the client
   */
  async fetchStory (storyId) {
    let story = this.stories.getStory(storyId)

    // if not on memory cache
    if (!story) {
      // try the localStorage cache
      story = this.cache.get(storyId)
      if (story) {
        // add it to memory cache
        this.stories.addStory(story)
      }
    }

    // if not on memory cache, nor localStorage
    if (!story) {
      // request it from the client
      const item = await this.client.getItem(storyId)
      if (item) {
        story = Story.fromItem(item)
      } else { // null items
        story = Story.fromNull(storyId)
      }

      // add it to localStorage and memory caches
      this.cache.add(story)
      this.stories.addStory(story)
    }

    this.storyListener.fire(story)
  }

  // subscribe to this event for getting new stories
  // returns the cleanup routine
  onNewStory (cb) {
    this.storyListener.registerListener(cb)
    return () => {
      this.storyListener.removeListener(cb)
    }
  }
}
