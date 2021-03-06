/**
 * Stories List
 */

import React, { useEffect, useReducer, useMemo } from 'react'
import Story from '../story'
import LazyStory from '../story/lazy'
import InfiniteScrollable from '../scrollable/infinite'

const STORIES_PAGINATION = 30

export default function Stories ({ provider }) {
  const [storiesIds, appendStoriesIds] = useStoriesIds()
  const [storyMap, addNewStory] = useStoryMap({})

  const fetchNextStories = () => {
    const storyIds = provider.fetchNextStories(STORIES_PAGINATION)
    appendStoriesIds(storyIds)
  }

  useEffect(() => {
    provider.onNewStory(story => {
      addNewStory(story)
    })
  }, [])

  useEffect(fetchNextStories, [])

  const renderedStories = storiesIds.map(storyId => {
    const story = storyMap[storyId]

    if (!story) {
      return (<LazyStory id={storyId} key={storyId} />)
    }

    return useMemo(() => (
      <Story
        id={storyId}
        key={storyId}
        title={story.title}
        url={story.url}
        author={story.author}
        timestamp={story.timestamp}
      />
    ), [story])
  })

  return (
    <InfiniteScrollable onScroll={fetchNextStories}>
      <ul className='stories-list'>
        {renderedStories}
      </ul>
    </InfiniteScrollable>
  )
}
function storyIdsReducer (state, action) {
  switch (action.type) {
    case 'append-stories':
      return state.concat(action.storiesIds)
    default:
      throw new Error()
  }
}

function useStoriesIds (initialVal = []) {
  const [storiesIds, dispatch] = useReducer(storyIdsReducer, initialVal)

  const appendStoriesIds = (ids) => {
    dispatch({ type: 'append-stories', storiesIds: ids })
  }

  return [storiesIds, appendStoriesIds]
}

function storyMapReducer (state, action) {
  switch (action.type) {
    case 'add-story':
      return {
        ...state,
        [action.story.id]: action.story
      }
    default:
      throw new Error()
  }
}

function useStoryMap (initialVal = {}) {
  const [storyMap, dispatch] = useReducer(storyMapReducer, initialVal)

  const addNewStory = (story) => {
    dispatch({ type: 'add-story', story })
  }

  return [storyMap, addNewStory]
}
