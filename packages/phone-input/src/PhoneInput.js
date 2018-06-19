import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import TextMaskInput from 'react-text-mask'

import { buildClassName } from '@talixo/shared'

import { SelectBox } from '@talixo/combo-box'
import { CountryFlag } from '@talixo/country-flag'

import countriesList from '../utils/countriesList'
import detectCountry from '../utils/detectCountry'
import replaceCountryPrefix from '../utils/replaceCountryPrefix'
import buildMaskForCountry from '../utils/buildMaskForCountry'

export const moduleName = 'phone-input'

const propTypes = {
  /** Additional class name for wrapper */
  className: PropTypes.string,

  /** Indicates that input has error */
  error: PropTypes.bool,

  /** Phone number to put inside (control from outside) */
  value: PropTypes.string,

  /** Placeholder value, when no number is set */
  placeholder: PropTypes.string,

  /** Event handler when number is changed */
  onChange: PropTypes.func,

  /** Event handler when input has lost focus */
  onBlur: PropTypes.func,

  /** Event handler when input has been focused */
  onFocus: PropTypes.func
}

const defaultProps = {
  error: false
}

/**
 * Trim value (including \u2000 placeholders).
 *
 * @param {string} value
 * @returns {string}
 */
function trim (value) {
  return value.replace(/[\u2000]+/g, '').trim()
}

/**
 * Set caret position in specified element.
 *
 * @param {HTMLElement} element
 * @param {number} position
 */
function setCaretPosition (element, position) {
  if (!element) {
    return
  }

  if (element.setSelectionRange) {
    element.focus()
    element.setSelectionRange(position, position)
  }
}

/**
 * Render country with prefix as dropdown item.
 *
 * @param {object|{ code: string, prefix: string, name: string }} country
 * @returns {React.Element}
 */
function renderCountryItem (country) {
  return (
    <div className={buildClassName([ moduleName, 'country' ])}>
      <CountryFlag code={country.code} />
      <div className={buildClassName([ moduleName, 'country', 'description' ])}>
        <strong>{country.prefix}</strong>
        <span>{country.name}</span>
      </div>
    </div>
  )
}

/**
 * Component which represents input to provided phone number.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {boolean} [props.error]
 * @property {string} [props.value]
 * @property {string} [props.placeholder]
 * @property {function} [props.onChange]
 * @property {function} [props.onFocus]
 * @property {function} [props.onBlur]
 *
 * @property {object} state
 * @property {string} state.value
 * @property {boolean} state.focused
 * @property {string|null} [state.country]
 * @property {boolean|string[]} state.focus
 * @property {boolean|string[]} state.hover
 *
 * @class
 */
class PhoneInput extends React.PureComponent {
  state = {
    value: this.props.value || '',
    country: detectCountry(this.props.value),

    hover: false,
    focus: false,

    // Hack for text-mask-input
    focused: false
  }

  /**
   * Pass value when component is controlled from outside.
   *
   * @param {object} props
   * @param {string} [props.value]
   */
  componentWillReceiveProps (props) {
    if (props.value != null && props.value !== this.state.value) {
      this.setState({
        value: props.value,
        country: detectCountry(props.value)
      })
    }
  }

  /**
   * Clear all timers when component is unmounted.
   */
  componentWillUnmount () {
    clearTimeout(this.caretTimeout)
    clearTimeout(this.focusTimeout)
  }

  /**
   * Request change of phone number.
   *
   * @param {string} value
   */
  change (value) {
    value = trim(value)

    // Update state immediately, when component is self-controlled
    if (this.props.value == null) {
      this.setState({ value })
    }

    // Detect current country by prefix
    const country = detectCountry(value)

    // Change country if it's different
    if (country !== this.state.country) {
      this.setState({ country })
    }

    // Trigger 'change' event
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  /**
   * Change country prefix in current phone number.
   *
   * @param {object} country
   */
  changeCountry = (country) => {
    const nextValue = replaceCountryPrefix(this.state.value, this.state.country, country)
    const endPrefix = nextValue.indexOf(' ') + 1

    this.change(nextValue)

    // Focus input when it is possible,
    // and move cursor after prefix
    if (this.el) {
      this.el.focus()

      if (endPrefix) {
        clearTimeout(this.caretTimeout)
        this.caretTimeout = setTimeout(() => setCaretPosition(this.el, endPrefix))
      }
    }
  }

  /**
   * Save reference to input, to allow focusing it later.
   *
   * @param {HTMLElement} node
   */
  saveRef = (node) => {
    this.el = findDOMNode(node)
  }

  onInputMouseOver = () => this.setMouseOverState('input')
  onInputMouseOut = () => this.setMouseOutState('input')
  onInputFocus = () => this.setFocusState('input')
  onInputBlur = () => this.setBlurState('input')

  onListMouseOver = () => this.setMouseOverState('flags')
  onListMouseOut = () => this.setMouseOutState('flags')
  onListFocus = () => this.setFocusState('flags')
  onListBlur = () => this.setBlurState('flags')

  /**
   * Set hover state
   *
   * @param {string} what
   */
  setMouseOverState (what) {
    const hover = this.state.hover ? this.state.hover.filter(x => x !== what) : []
    hover.push(what)
    this.setState({ hover })
  }

  /**
   * Set dis-hover state.
   *
   * This needs to be delayed by setTimeout,
   * because 'mouseOut' will happen before 'mouseEnter'.
   *
   * Broken scenario without delay:
   *
   * Given: user who has hover on flags drop-down
   * When: he moves cursor to input
   * Then:
   *   - handle 'mouseout' on flags drop-down
   *   - lose hover status on PhoneInput
   *   - handle 'mouseover' on input
   *   - set hover status on PhoneInput
   * Result: PhoneInput is blinking
   *
   * @param {string} what
   */
  setMouseOutState (what) {
    setTimeout(() => {
      const hover = this.state.hover ? this.state.hover.filter(x => x !== what) : []
      this.setState({ hover: hover.length ? hover : false })
    })
  }

  /**
   * Set focus state
   *
   * @param {string} what
   */
  setFocusState (what) {
    const focus = this.state.focus ? this.state.focus.filter(x => x !== what) : []
    focus.push(what)
    this.setState({ focus })
  }

  /**
   * Set blur state
   *
   * This needs to be delayed by setTimeout,
   * because 'blur' will happen before 'focus'.
   *
   * @see {PhoneInput.setMouseOutState}
   *
   * @param {string} what
   */
  setBlurState (what) {
    setTimeout(() => {
      const focus = this.state.focus ? this.state.focus.filter(x => x !== what) : []
      this.setState({ focus: focus.length ? focus : false })
    })
  }

  /**
   * Render SelectBox with countries and prefixes.
   *
   * @returns {React.Element}
   */
  renderCountryBox () {
    return (
      <SelectBox
        className={buildClassName([ moduleName, 'country-box' ])}
        options={countriesList}
        value={this.state.country}
        placeholder={<span className={buildClassName([ moduleName, 'unknown-flag' ])} />}
        renderValue={country => <CountryFlag code={country.code} />}
        renderItem={renderCountryItem}
        buildItemId={country => country.code}
        onChange={this.changeCountry}
        onFocus={this.onListFocus}
        onBlur={this.onListBlur}
        onMouseEnter={this.onListMouseOver}
        onMouseLeave={this.onListMouseOut}
      />
    )
  }

  /**
   * Handle focusing text input.
   *
   * @param {Event|SyntheticEvent} event
   */
  focus = (event) => {
    const { onFocus } = this.props

    this.onInputFocus()

    // Make sure that user can't click on some place in input, where it guides him
    // TODO: when react-text-mask will properly work with removing placeholder character, remove it
    clearTimeout(this.focusTimeout)
    this.focusTimeout = setTimeout(() => this.setState({
      focused: true
    }))

    if (onFocus) {
      onFocus(event)
    }
  }

  /**
   * Handle losing focus on text input.
   *
   * @param {Event|SyntheticEvent} event
   */
  blur = (event) => {
    const { onBlur } = this.props

    this.onInputBlur()

    this.setState({ focused: false })

    if (onBlur) {
      onBlur(event)
    }
  }

  /**
   * Render input with phone number.
   *
   * @returns {React.Element}
   */
  renderInput () {
    const { placeholder } = this.props
    const { value, country, focused } = this.state

    return (
      <TextMaskInput
        guide={focused}
        keepCharPositions={false}
        mask={buildMaskForCountry(country)}
        placeholderChar={'\u2000'}
        type='tel'
        ref={this.saveRef}
        value={value}
        placeholder={placeholder}
        onChange={e => this.change(e.target.value)}
        onMouseEnter={this.onInputMouseOver}
        onMouseOut={this.onInputMouseOut}
        onMouseLeave={this.onInputMouseOut}
        onFocus={this.focus}
        onBlur={this.blur}
      />
    )
  }

  /**
   * Render phone number input control.
   *
   * @returns {React.Element}
   */
  render () {
    const { className, error, onChange, onFocus, onBlur, placeholder, ...passedProps } = this.props
    const { hover, focus } = this.state

    const clsName = buildClassName(moduleName, className, {
      error,
      hover: hover && hover.length,
      focus: focus && focus.length
    })

    return (
      <span className={clsName} {...passedProps}>
        {this.renderCountryBox()}
        {this.renderInput()}
      </span>
    )
  }
}

PhoneInput.propTypes = propTypes

PhoneInput.defaultProps = defaultProps

export default PhoneInput
