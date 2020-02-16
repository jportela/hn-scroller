export default class Stories {
  constructor (newStoriesIds = []) {
    this.newStoriesIds = newStoriesIds
    this.stories = new Map()
  }

  addStory (story) {
    this.stories.set(story.id, story)
  }

  getStory (id) {
    return this.stories.get(id)
  }

  /**
   * Retrieves a subset of the newStories
   * offset -> from index
   * limit -> number of items to retrieve
   */
  getNewStoryIds (offset, limit) {
    if (offset >= this.newStoriesIds.length) {
      return [] // end of stream
    }
    return this.newStoriesIds.slice(offset, offset + limit)
  }
}
