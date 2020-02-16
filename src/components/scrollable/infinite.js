/**
 * Infinite Scroll Container
 */

import React, { useRef, useEffect } from 'react'

const SCROLL_THRESHOLD = 50

export default function InfiniteScrollable ({ onScroll, children }) {
  const containerRef = useInfiniteScroll(onScroll)

  return (
    <div className='infinite-scrollable-container' ref={containerRef}>
      {children}
    </div>
  )
}

function useInfiniteScroll (onScroll) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const listener = () => {
      const $element = ref.current
      if (!$element) {
        return
      }
      if ($element.scrollTop + $element.clientHeight >= $element.scrollHeight - SCROLL_THRESHOLD) {
        onScroll()
      }
    }
    ref.current.addEventListener('scroll', listener)
    return () => {
      if (!ref.current) {
        return
      }
      ref.current.removeEventListener('scroll', listener)
    }
  }, [ref])

  return ref
}
