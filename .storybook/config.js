import { configure } from '@storybook/react'

function loadStyles() {
  require('../packages/breadcrumbs/styles/main.sass')

  // Loading by context is too slow, as it goes into all packages of packages as well
  // const context = require.context('../packages/', true, /main\.sass$/)
  // context.keys().forEach(context)
}

function loadStories() {
  require('../packages/breadcrumbs/stories.js')

  // Loading by context is too slow, as it goes into all packages of packages as well
  // const context = require.context('../packages/', true, /^.\/[^/]+\/stories\.js$/)
  // context.keys().forEach(context)
}

configure(loadStories, module)

loadStyles()
