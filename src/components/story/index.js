import React from 'react'
import StoryTitle from './title'
import StoryAuthor from './author'
import StoryTime from './time'

export default function Story({ id, title, url, author, timestamp, isLazy }) {
  if (!title) {
    return null
  }

  const classes = ['story-item']
  
  if (isLazy) {
    classes.push('is-lazy')
  }

  return (
    <li className={classes.join(' ')}>
      <StoryTitle title={title} url={url} />
      {' '}
      <StoryAuthor author={author} />
      {' '}
      <StoryTime timestamp={timestamp} />
    </li>
  )
}
