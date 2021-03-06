import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import __name__ from './src/__name__'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('__title__', module, {
  propTables: [ __name__ ]
})

// Stories

addStory('initial', readme, () => (
  <__name__ />
))
