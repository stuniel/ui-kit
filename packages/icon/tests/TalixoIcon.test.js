import React from 'react'
import { shallow } from 'enzyme'

import Icon from '../src/TalixoIcon'

const EXAMPLE = 'affiliate'

describe('<Icon />', () => {
  it('renders Material icon correctly', () => {
    const wrapper = shallow(<Icon name={EXAMPLE} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('handles properly additional classes for Material icon', () => {
    const wrapper = shallow(<Icon name={EXAMPLE} className='abc' />)

    expect(wrapper.props().className).toMatch(/(^| )abc( |$)/)
    expect(wrapper.props().className).not.toEqual('abc')
  })

  it('handles properly additional properties for Material icon', () => {
    const wrapper = shallow(<Icon name={EXAMPLE} id='def' className='abc' />)

    expect(wrapper.props().id).toEqual('def')
  })
})
