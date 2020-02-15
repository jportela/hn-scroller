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

  fetchNextStories (limit) {
    if (this.isFetching) {
      return []
    }
    this.isFetching = true
    const storyIds = this.stories.getNewStoryIds(this.newStoryOffset, limit)

    Promise.all(
      storyIds.map(storyId => this.fetchStory(storyId))
    ).then(() => {
      this.newStoryOffset += storyIds.length
      this.isFetching = false
    }).catch(e => console.error('Could not fetch story:', e))

    return storyIds
  }

  async fetchStory (storyId) {
    let story = this.stories.getStory(storyId)

    if (!story) {
      story = this.cache.get(storyId)
      if (story) {
        this.stories.addStory(story)
      }
    }

    if (!story) {
      const item = await this.client.getItem(storyId)
      if (item) {
        story = Story.fromItem(item)
      } else { // null items
        story = Story.fromNull(storyId)
      }

      this.cache.add(story)
      this.stories.addStory(story)
    }

    this.storyListener.fire(story)
  }

  onNewStory (cb) {
    this.storyListener.registerListener(cb)
    return () => {
      this.storyListener.removeListener(cb)
    }
  }
}
