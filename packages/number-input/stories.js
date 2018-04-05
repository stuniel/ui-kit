import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import NumberInput from './src/NumberInput'
import { action } from '@storybook/addon-actions'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('NumberInput', module)
const change = action('change')

// Stories

addStory('default', readme, () => (
  <div>
    <h2>Default number input</h2>
    <NumberInput onChange={change} />
    <h2>Default number input with initial value</h2>
    <NumberInput onChange={change} value={15} />
    <h2>Number input with errors</h2>
    <NumberInput onChange={change} hasError />
  </div>
))

addStory('small', readme, () => (
  <div>
    <h2>Small number input</h2>
    <NumberInput onChange={change} size='small' />
    <h2>Default number input with initial value</h2>
    <NumberInput onChange={change} size='small' value={15} />
    <h2>Small number input with errors</h2>
    <NumberInput onChange={change} size='small' hasError />
  </div>
))
