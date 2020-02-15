import React from 'react'
import { agoFromTimestamp } from '../../shared/time/ago'

export default function StoryTime ({ timestamp }) {
  const timeInMs = timestamp * 1000
  const tooltip = (new Date(timeInMs)).toLocaleString()
  return (
    <span className='story-time' title={tooltip}>
      {agoFromTimestamp(timeInMs)}
    </span>
  )
}
