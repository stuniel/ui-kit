import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

export const moduleName = 'masked-input'

const propTypes = {
  /** Additional class name passed to wrapper. */
  className: PropTypes.string,

  /** Event called when input inside  input has lost focus. */
  onBlur: PropTypes.func,

  /** Event called when input inside has changed. */
  onChange: PropTypes.func,

  /** Event called when input is focused. */
  onFocus: PropTypes.func,

  /** Input element. */
  renderInput: PropTypes.node.isRequired,

  /** Function which returns masking element to render when input is blurred. First argument function is value passed
   * either by parent changing value prop or by children if `props.value` is undefined.
   * */
  renderMask: PropTypes.func.isRequired,

  /** Value to be passed to render mask function.  */
  value: PropTypes.any
}

const defaultProps = {
}

/**
 * Component which represents Masked Input.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @returns {React.Element}
 */
class MaskedInput extends React.Component {
  state = {
    value: null,
    focused: false
  }

  /**
   * Update value inside state if it was updateed
   *
   * @param nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  /**
   * Handle focus change. Update focused inside state
   * and invoke passed onBlur/onFocus callbacks
   *
   * @param {boolean} focused
   * @param {*} args
   */
  handleFocusChange = (focused, ...args) => {
    const { onFocus, onBlur } = this.props
    const { props: { onFocus: childOnFocus, onBlur: childOnBlur } } = this.props.renderInput

    // Updated state when focus changes
    this.setState({ focused })

    // Invoke onFocus callback of MaskInput and/or children
    if (focused) {
      if (onFocus) onFocus(focused, ...args)
      if (childOnFocus) childOnFocus(...args)
    }

    // Invoke onBLur callback of MaskInput and/or children
    if (!focused) {
      if (onBlur) onBlur(focused, ...args)
      if (childOnBlur) childOnBlur(...args)
    }
  }

  /**
   * Update value inside state
   *
   * @param v
   * @param args
   */
  handleChange = (v, ...args) => {
    const { onChange, value } = this.props
    const { props: { onChange: childOnChange } } = this.props.renderInput

    // Invoke MaskInpu onChange callback if is set
    if (onChange) {
      onChange(v, ...args)
    }

    // Invoke children onChange callback if is set
    if (childOnChange) {
      childOnChange(v, ...args)
    }

    // If no value is passed from props update it to match the value passed by children
    if (value === undefined) {
      this.setState({ value: v })
    }
  }
  /**
   * Generate input props with new event handlers
   *
   * @returns {{onBlur: void | any, onFocus: void | any, onChange: MaskedInput.handleChange}}
   */
  getInputProps = () => {
    const { renderInput } = this.props
    const { handleFocusChange, handleChange } = this

    const newProps = {
      ...renderInput.props,
      onBlur: handleFocusChange.bind(this, false),
      onFocus: handleFocusChange.bind(this, true),
      onChange: handleChange
    }

    return newProps
  }

  /**
   * Create element from function passed to renderMask prop and apply class
   *
   * @returns {object|null}
   */
  maskRenderer = () => {
    const { focused, value } = this.state
    const { renderMask } = this.props

    // Only generate element if input is not focused and value inside state exists
    if (!focused && value) {
      const element = renderMask(value)
      return React.cloneElement(element, {
        ...element.porps,
        className: buildClassName([moduleName, 'mask'], element.props.className)
      })
    }
    return null
  }

  render () {
    const {
      className, error, onBlur, onFocus,
      onChange, renderInput, renderMask, ...passedProps
    } = this.props
    const { getInputProps, maskRenderer } = this
    const wrapperCls = buildClassName(moduleName, className)
    const mask = maskRenderer()
    const inputProps = getInputProps()

    return (
      <div className={wrapperCls} {...passedProps}>
        { mask }
        { React.cloneElement(renderInput, inputProps) }
      </div>
    )
  }
}

MaskedInput.propTypes = propTypes

MaskedInput.defaultProps = defaultProps

export default MaskedInput
