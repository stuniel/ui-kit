import React from 'react'
import { action } from '@storybook/addon-actions'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import RadioInput from './src/RadioInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Radio Input', module)
const change = action('change')

// Stories

addStory('default', readme, () => (
  <div>
    <h2>Radio</h2>
    <RadioInput onChange={change} name='default'>Option</RadioInput>
    <RadioInput onChange={change} name='default'>Option two</RadioInput>
    <br /><br />

    <h2>Radio group with default value</h2>
    <RadioInput onChange={change} name='default_checked'>Option</RadioInput>
    <RadioInput onChange={change} name='default_checked' defaultChecked>Option default checked</RadioInput>
    <br /><br />

    <h2>Radio with disabled option</h2>
    <RadioInput onChange={change} name='default_disabled'>Option</RadioInput>
    <RadioInput onChange={change} name='default_disabled' defaultChecked>Option default checked</RadioInput>
    <RadioInput onChange={change} name='default_disabled' disabled>Option disabled</RadioInput>
    <br /><br />

    <h2>Radio with error</h2>
    <RadioInput onChange={change} name='default_error' error>Option</RadioInput>
    <RadioInput onChange={change} name='default_error' error defaultChecked>Option default checked</RadioInput>
    <RadioInput onChange={change} name='default_error' error>Option disabled</RadioInput>
    <br /><br />

    <h2>Radio with all disabled options</h2>
    <RadioInput onChange={change} name='default_all_disabled' disabled>Option</RadioInput>
    <RadioInput onChange={change} name='default_all_disabled' disabled defaultChecked>Option default checked</RadioInput>
    <RadioInput onChange={change} name='default_all_disabled' disabled>Option disabled</RadioInput>
    <br /><br />

    <h2>Radio with error with all disabled options</h2>
    <RadioInput onChange={change} name='default_all_disabled_error' error disabled>Option</RadioInput>
    <RadioInput onChange={change} name='default_all_disabled_error' error disabled defaultChecked>Option default checked</RadioInput>
    <RadioInput onChange={change} name='default_all_disabled_error' error disabled>Option disabled</RadioInput>
  </div>
))
