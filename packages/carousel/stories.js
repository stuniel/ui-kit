import React from 'react'
import { createStoriesFactory, getReadmeDescription } from '@talixo/shared/story'

import Carousel from './src/Carousel'

// Load first paragraph from README file
const readme = getReadmeDescription(require('./README.md'))

// Create factories for story
const addStory = createStoriesFactory('Carousel', module, {
  propTables: [ Carousel ]
})

// Custom dots
function renderNumberDots (props) {
  const { slides, value, onChange } = props

  const clsName = 'tx-custom-dots__dot'
  const activeClsName = 'tx-custom-dots__dot tx-custom-dots__dot--active'

  const elements = []

  for (let i = 0; i < slides.length; i++) {
    elements.push(
      <div key={i} className={value === i ? activeClsName : clsName} onClick={() => onChange(i)}>
        {i + 1}
      </div>
    )
  }

  return (
    <div className='tx-custom-dots'>
      {elements}
    </div>
  )
}

function renderThumbnails (props) {
  const { slides, value, onChange } = props

  const clsName = 'tx-gallery-dots__dot'
  const activeClsName = 'tx-gallery-dots__dot tx-gallery-dots__dot--active'

  const elements = []

  for (let i = 0; i < slides.length; i++) {
    elements.push(
      <div key={i} className={value === i ? activeClsName : clsName} onClick={() => onChange(i)}>
        {slides[i]}
      </div>
    )
  }

  return (
    <div className='tx-gallery-dots'>
      {elements}
    </div>
  )
}

// Custom wrapper component with automatic sliding
class CustomWrapperComponent extends React.PureComponent {
  componentDidMount () {
    if (this.child) {
      setInterval(this.child.handlerNext, this.props.interval)
    }
  }

  render () {
    return (
      <Carousel ref={instance => { this.child = instance }}>
        <div className='tx-slide tx-slide--1'>SLIDE 1</div>
        <div className='tx-slide tx-slide--2'>SLIDE 2</div>
        <div className='tx-slide tx-slide--3'>SLIDE 3</div>
      </Carousel>
    )
  }
}

// Stories

addStory('initial', readme, () => (
  <Carousel>
    <div className='tx-slide tx-slide--1'>SLIDE 1</div>
    <div className='tx-slide tx-slide--2'>SLIDE 2</div>
    <div className='tx-slide tx-slide--3'>SLIDE 3</div>
  </Carousel>
))

addStory('with arrows', readme, () => (
  <Carousel arrows>
    <div className='tx-slide tx-slide--1'>SLIDE 1</div>
    <div className='tx-slide tx-slide--2'>SLIDE 2</div>
    <div className='tx-slide tx-slide--3'>SLIDE 3</div>
  </Carousel>
))

addStory('with more elements on one slide', readme, () => (
  <Carousel arrows perPage={3}>
    <div className='tx-slide tx-slide--1'>SLIDE 1</div>
    <div className='tx-slide tx-slide--2'>SLIDE 2</div>
    <div className='tx-slide tx-slide--3'>SLIDE 3</div>
    <div className='tx-slide tx-slide--1'>SLIDE 4</div>
    <div className='tx-slide tx-slide--2'>SLIDE 5</div>
    <div className='tx-slide tx-slide--3'>SLIDE 6</div>
    <div className='tx-slide tx-slide--1'>SLIDE 7</div>
  </Carousel>
))

addStory('with arrows and dots', readme, () => (
  <Carousel arrows dots>
    <div className='tx-slide tx-slide--1'>SLIDE 1</div>
    <div className='tx-slide tx-slide--2'>SLIDE 2</div>
    <div className='tx-slide tx-slide--3'>SLIDE 3</div>
  </Carousel>
))

addStory('with more elements & dots', readme, () => (
  <Carousel dots perPage={3}>
    <div className='tx-slide tx-slide--1'>SLIDE 1</div>
    <div className='tx-slide tx-slide--2'>SLIDE 2</div>
    <div className='tx-slide tx-slide--3'>SLIDE 3</div>
    <div className='tx-slide tx-slide--1'>SLIDE 4</div>
    <div className='tx-slide tx-slide--2'>SLIDE 5</div>
    <div className='tx-slide tx-slide--3'>SLIDE 6</div>
    <div className='tx-slide tx-slide--1'>SLIDE 7</div>
  </Carousel>
))

addStory('with custom dots', readme, () => (
  <Carousel dots renderDots={renderNumberDots}>
    <div className='tx-slide tx-slide--1'>SLIDE 1</div>
    <div className='tx-slide tx-slide--2'>SLIDE 2</div>
    <div className='tx-slide tx-slide--3'>SLIDE 3</div>
  </Carousel>
))

addStory('as a gallery', readme, () => (
  <div style={{ maxWidth: 1000, margin: '0 auto' }}>
    <Carousel arrows dots renderDots={renderThumbnails}>
      <img className='tx-gallery-item' src='https://placeimg.com/1000/480/any' />
      <img className='tx-gallery-item' src='https://placeimg.com/1000/480/any?2' />
      <img className='tx-gallery-item' src='https://placeimg.com/1000/480/any?3' />
      <img className='tx-gallery-item' src='https://placeimg.com/1000/480/any?4' />
      <img className='tx-gallery-item' src='https://placeimg.com/1000/480/any?5' />
    </Carousel>
  </div>
))

addStory('Custom wrapper component with automatic sliding', readme, () => (
  <CustomWrapperComponent interval={2500} />
))
