import React from 'react'

export default function StoryTitle({ title, url }) {
  return (
    <a href={url} className="story-title">
      {title}
    </a>
  )
}
