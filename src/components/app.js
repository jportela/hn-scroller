import React from 'react'
import Stories from './stories'
import Header from './header'
import Footer from './footer'

export default function App({ storiesProvider, cache }) {
  const clearCache = () => {
    cache.clear()
  }
  return (
    <React.Fragment>
      <Header />
      <Stories provider={storiesProvider} />
      <Footer clearCache={clearCache} />
    </React.Fragment>
  )
}
