import React from 'react'

import Modal from './src/Modal'
import Button from '@talixo/button'

import {
  createStoriesFactory,
  getReadmeDescription
} from '@talixo/shared/story'

const readme = getReadmeDescription(require('./README.md'))

const addStory = createStoriesFactory('Modal', module)

const render = (setState, state) => {
  const modalRoot = document.querySelector('body')
  return (
    <div>
      <Button onClick={() => { setState({ isOpen: !state.isOpen }) }}>
        Open Modal
      </Button>
      <Modal isOpen={state.isOpen} root={modalRoot}>
        <h1>Modal</h1>
        <Button onClick={() => { setState({ isOpen: false }) }}>
          Close Modal
        </Button>
      </Modal>
    </div>
  )
}
const getInitialState = () => {
  return {
    isOpen: false
  }
}
const options = {
  propTypes: [ Modal, Button ],
  propTablesExclude: [ Button ]
}

addStory.controlled('default', readme, render, getInitialState, options)
