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

  clearUnusedItems (newItems) {
    const stories = this.getStories()

    if (stories.length === 0) {
      this.storage.setItem('stories', JSON.stringify(newItems))
      return
    }

    const itemSet = new Set(newItems)
    stories.forEach(id => {
      if (!itemSet.has(id)) {
        this.storage.removeItem(StoryCache.getKey(id))
      }
    })
    this.storage.setItem('stories', JSON.stringify(newItems))
  }

  static getKey (storyId) {
    return `${STORY_ITEM_PREFIX}-${storyId}`
  }
}
