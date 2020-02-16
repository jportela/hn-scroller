# HN Scroller

Hacker News with Infinite Scroller

```
npm install # install will also build the needed bundles
npm start # starts an http-server, to serve the content
```

Tested with:

* **Node**: 13.8
* **NPM**: 6.13

## Dependencies

  * `preact`, as a way to improve code readibility and modularization. [Preact](https://preactjs.com/) is a smaller alternative to `react`, that's compatible with its API
  * a few development dependencies:
    * `webpack` and a few loaders/plugins to create single js/css bundles
    * `babel` and a few presets for transpiling modern ES to modern browsers
    * `jest` for unit tests
    * `standard` for linting
    * `http-server` for spinning up a server to serve the static content

## Code Organization

| Path | Description |
| ---- | ----------- |
| [`src/clients`](src/clients) | Clients for external APIs |
| [`src/components`](src/components) | React Components for the UI layer |
| [`src/models`](src/models) | Models for the domain data |
| [`src/offline`](src/offline) | Utilities for supporting offline and the progressive web app |
| [`src/providers`](src/providers) | Data orchestrators |
| [`src/shared`](src/shared) | Common utilities |

## Implementation Highlights

  * Use of dependency injection, to improve modularization and testability
  * Reliance on the `newstories.json` endpoint, that retrieves the last 500 stories, so the "infinite" scroll will stop at 500 stories
  * Started using `react` but switched to `preact` (compatible) in an effort to reduce JS bundle size (reduced from 130KB to 33KB)
  * Use of Service Workers to cache and serve static assets offline. At first I also used them to cache the
new stories and stories requests, but preferred to use `localStorage` instead to only cache the story data the app needs
  * Targeted >2% of browsers without IE 11 to reduce bundle size. The following browser versions should be supported:
    * and_chr 79
    * and_uc 12.12
    * chrome 79
    * firefox 72
    * ios_saf 13.3
    * safari 13
    * samsung 10.1