
import React from 'react'

export default function Footer ({ clearCache }) {
  return (
    <footer>
      Done with {'<3'} and web tech by
      {' '}
      <a href='http://www.github.com/jportela' target='_blank' rel='noopener noreferrer'>jportela</a>
      {' '}
      [<a href='/' onClick={clearCache}>Clear Cache</a>]
    </footer>
  )
}
