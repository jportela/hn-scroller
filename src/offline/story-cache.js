/**
 * Retrieves and stores Stories in localStorage
 */

const STORIES_KEY = 'stories'
const STORY_ITEM_PREFIX = 'story'

export default class StoryCache {
  constructor (storage) {
    this.storage = storage
  }

  get (storyId) {
    const result = this.storage.getItem(StoryCache.getKey(storyId))
    if (!result) {
      return null
    }
    return JSON.parse(result)
  }

  add (story) {
    this.storage.setItem(StoryCache.getKey(story.id), JSON.stringify(story))
  }

  getStories () {
    const result = this.storage.getItem(STORIES_KEY)
    if (!result) {
      return []
    }
    return JSON.parse(result)
  }

  clear () {
    this.storage.clear()
  }

  /**
   * Compares newItems and removes the ones that are not
   * on the list anymore, to clear unused space
   */
  clearUnusedItems (newItems) {
    // old stories
    const stories = this.getStories()

    // updates storage with the newer stories
    this.storage.setItem(STORIES_KEY, JSON.stringify(newItems))

    // if no old stories, skip this
    if (stories.length === 0) {
      return
    }

    const itemSet = new Set(newItems)
    stories.forEach(id => {
      // if id not present on the new stories fetched, remove it from cache
      if (!itemSet.has(id)) {
        this.storage.removeItem(StoryCache.getKey(id))
      }
    })
  }

  static getKey (storyId) {
    return `${STORY_ITEM_PREFIX}-${storyId}`
  }
}
