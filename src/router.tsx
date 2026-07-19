import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// You must export a getRouter function that
// returns a new router instance each time
export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    // Thread fetches are expensive, so we only preload on explicit intent
    // (handled per-link, e.g. ForesightLink on the board list).
    defaultPreload: false,
  })

  return router
}
