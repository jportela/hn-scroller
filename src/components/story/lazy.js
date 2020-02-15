import React from 'react'
import Story from '.'

export default function LazyStory ({ id }) {
  const title = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  const author = 'jportela'
  const timestamp = (+new Date() - 42 * 60 * 1000) / 1000
  return (
    <Story
      id={id}
      isLazy
      title={title}
      author={author}
      timestamp={timestamp}
    />
  )
}
