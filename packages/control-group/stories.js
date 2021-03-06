import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import { Button } from '@talixo/button'

import ControlGroup from './src/ControlGroup'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('ControlGroup', module, {
  propTables: [ ControlGroup ]
})

// Stories

addStory('initial', readme, () => (
  <ControlGroup>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ControlGroup>
))

addStory('horizontal center', readme, () => (
  <ControlGroup position='center'>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ControlGroup>
))

addStory('horizontal end', readme, () => (
  <ControlGroup position='end'>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ControlGroup>
))

addStory('vertical start', readme, () => (
  <ControlGroup orientation='vertical'>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ControlGroup>
))

addStory('vertical center', readme, () => (
  <ControlGroup orientation='vertical' position='center'>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ControlGroup>
))

addStory('vertical right', readme, () => (
  <ControlGroup orientation='vertical' position='end'>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ControlGroup>
))
