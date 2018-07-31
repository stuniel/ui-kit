import React from 'react'
import { shallow, mount } from 'enzyme'
import { prefix } from '@talixo/shared'

import ColorInput from '../src/ColorInput'

const name = prefix('color-input')

// Color from palette to test
const testColor = '#ec0000'

// Palette for testing
const palette = [
  {
    id: 'red1',
    name: 'awesome-red',
    color: testColor
  },
  {
    id: 'blue2',
    name: 'fantastic-blue',
    color: '#0004d0'
  },
  {
    id: 'green3',
    name: 'fresh-green',
    color: '#00c41c'
  }
]

// Event for tooltips
function dispatchEvent (element, eventName, mouse) {
  const Event = mouse ? window.MouseEvent : window.Event

  element.dispatchEvent(new Event(eventName))
}

describe('<ColorInput />', () => {
  it('renders children correctly', () => {
    const wrapper = shallow(<ColorInput />)

    expect(wrapper).toMatchSnapshot()
  })

  it('Change color when new color is provided', () => {
    const wrapper = mount(<ColorInput />)

    wrapper.setProps({defaultColor: '#eee'})

    expect(wrapper.state('color')).toBe('#eee')

    wrapper.unmount()
  })

  it('handle change color', () => {
    const wrapper = mount(<ColorInput />)

    expect(wrapper.state('color')).toBe(null)

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: '#ddd'
      }
    })

    expect(wrapper.state('color')).toBe('#ddd')

    wrapper.find('input').at(0).simulate('change', {
      target: {
        value: 'rgb(100, 100, 100)'
      }
    })

    expect(wrapper.state('color')).toBe('rgb(100, 100, 100)')

    wrapper.unmount()
  })

  it('handle onChange in color input', () => {
    const wrapper = mount(<ColorInput />)

    expect(wrapper.state('color')).toBe(null)

    expect(wrapper.find('input').at(1).prop('value')).toBe('#ffffff')

    wrapper.find('input').at(1).simulate('change', {
      target: {
        value: '#ddd'
      }
    })

    expect(wrapper.state('color')).toBe('#ddd')

    wrapper.unmount()
  })

  it('handle alpha', () => {
    const wrapper = mount(<ColorInput alpha />)
    dispatchEvent(wrapper.find(`.${name}__alpha-button`).getDOMNode(), 'click', true)
    wrapper.update()
    expect(wrapper.find('input').at(2).prop('value')).toBe(255)
    wrapper.find('input').at(2).simulate('change', {
      target: {
        value: 30
      }
    })
    expect(wrapper.find('input').at(2).prop('value')).toBe(30)
    wrapper.unmount()
  })

  it('handle palette', () => {
    const wrapper = mount(<ColorInput palette={palette} />)

    dispatchEvent(wrapper.find(`.${name}__palette-button`).getDOMNode(), 'click', true)
    wrapper.update()

    wrapper.find(`.${name}__palette-item`).at(0).simulate('click')

    expect(wrapper.state('color')).toBe(testColor)

    wrapper.unmount()
  })
})
