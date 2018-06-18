import React from 'react'

import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'
import { prefix } from '@talixo/shared'
import { Icon } from '@talixo/icon'

import FileInput from './src/FileInput'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('File Input', module, {
  propTables: [ FileInput ]
})

// Helpers
const iconCls = prefix('file-input-storybook', 'icon')
const wrapperCls = prefix('file-input-storybook', 'wrapper')

// Stories

addStory('initial', readme, () => (
  <FileInput />
))

addStory('with custom header', readme, () => (
  <FileInput>
    <div className={wrapperCls}>
      <div className={iconCls}><Icon name='cloud_upload' /></div>
      <div>Drop files here or<br /><br /></div>
    </div>
  </FileInput>
))
