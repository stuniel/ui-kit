import React from 'react'
import DropdownButton from '../src/DropdownButton'
import { mount } from 'enzyme'
import { prefix } from '@talixo/shared'

const name = prefix('combo-box')

describe('<DropdownButton />', () => {
  it('renders correctly', () => {
    const wrapper = mount(<DropdownButton />)
    expect(wrapper).toMatchSnapshot()
    wrapper.unmount()
  })

  it('renders no placeholder by default', () => {
    const wrapper = mount(<DropdownButton />)
    expect(wrapper.find(`.${name}__value`).exists()).toEqual(true)
    expect(wrapper.find(`.${name}__value`).contains('Number')).toEqual(false)
    wrapper.unmount()
  })

  it('renders placeholder correctly', () => {
    const wrapper = mount(<DropdownButton placeholder='Select item' />)
    expect(wrapper.find(`.${name}__value`).exists()).toEqual(true)
    expect(wrapper.find(`.${name}__value`).contains('Number')).toEqual(false)
    wrapper.unmount()
  })

  it('renders placeholder as value correctly', () => {
    const wrapper = mount(<DropdownButton value='apple' />)
    expect(wrapper.find(`.${name}__value`).exists()).toEqual(true)
    expect(wrapper.find(`.${name}__value`).contains('apple')).toEqual(true)
    wrapper.unmount()
  })

  it('renders overflow set to truncate correctly', () => {
    const wrapper = mount(<DropdownButton overflow='truncate' items={[1, 3, 5]} />)
    expect(wrapper.find(`.${name}__value`).exists()).toEqual(true)
    expect(wrapper.find(`.${name}__value`).every(`.${name}__item--overflow-truncate`)).toEqual(true)
    wrapper.unmount()
  })

  it('renders overflow set to break correctly', () => {
    const wrapper = mount(<DropdownButton overflow='break' items={[1, 3, 5]} />)
    expect(wrapper.find(`.${name}__value`).exists()).toEqual(true)
    expect(wrapper.find(`.${name}__value`).every(`.${name}__item--overflow-break`)).toEqual(true)
    wrapper.unmount()
  })
})
