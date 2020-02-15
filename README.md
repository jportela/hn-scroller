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

* `react` and `react-dom`, as a way to improve code readibility and modularization
* a few development dependencies


## Code Organization

| Path | Description |
| ---- | ----------- |
| `src/clients` | Clients for external APIs |
| `src/components` | React Components for the UI layer |
| `src/models` | Models for the domain data |
| `src/offline` | Utilities for supporting offline and the progressive web app |
| `src/providers` | Data orchestrators |
| `src/shared` | Common utilities |

## Implementation Highlights

* Use of dependency injection, to improve modularization and testability
* 
