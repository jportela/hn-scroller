import React from 'react'

export default function StoryTitle ({ title, url }) {
  return (
    <a href={url} className='story-title' rel='noopener noreferrer'>
      {title}
    </a>
  )
}
