import React from 'react'
import PropTypes from 'prop-types'

import { Formik } from 'formik'

import Form from './Form'
import isField from './isField'
import transformChildrenRecursively from './transformChildrenRecursively'

const propTypes = {
  /** Additional class name for form. */
  className: PropTypes.string,

  /** Error object. Key is a name of a field. */
  errors: PropTypes.objectOf(PropTypes.string),

  /** onSubmit callback function. */
  onSubmit: PropTypes.func,

  /** Validation object. A Yup schema or a function that returns a Yup schema. */
  validationSchema: PropTypes.object,

  /** Initial values of form fields. */
  values: PropTypes.object,

  /** Format error messages, passed to Field */
  formatErrorMessage: PropTypes.func,

  /** Component used for Form */
  FormComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ])
}

const defaultProps = {
  FormComponent: Form
}

const noop = () => {}

/**
 * Component which represents Form Handler
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {object} [props.errors]
 * @property {function} [props.formatErrorMessage]
 * @property {function} [props.onSubmit]
 * @property {object} [props.validationSchema]
 * @property {string} [props.values]
 *
 * @class
 */
class FormHandler extends React.PureComponent {
  /**
   * Update errors and values if changed from props.
   *
   * @param props
   */
  componentWillReceiveProps (props) {
    if (!this.formik) {
      return
    }

    // Check if any new errors are provided
    if (props.errors !== this.props.errors) {
      this.formik.getFormikBag().setErrors(props.errors || {})
    }

    // Check if any new value is provided
    if (props.values !== this.props.values && props.values != null) {
      const previous = this.props.values || {}
      const bag = this.formik.getFormikBag()

      for (const key in props.values) {
        // User has changed value manually, so do not fill it.
        if (previous[key] !== bag.values[key]) {
          continue
        }

        // Initial value is not changed or next value is empty
        if (props.values[key] === previous[key] || props.values[key] === undefined) {
          continue
        }

        // Update value
        bag.setFieldValue(key, props.values[key])
      }
    }
  }

  /**
   * Transform nodes so they can be recognized by Formik.
   *
   * @param {array} children
   * @param {object} options
   * @param {function} [options.formatErrorMessage]
   * @param {function} options.setFieldValue
   * @param {function} options.handleBlur
   * @param {array} options.values
   * @param {array} options.touched
   * @param {array} options.errors
   *
   * @returns {array}
   */
  buildNodesList (children, options) {
    return transformChildrenRecursively(
      children,
      node => this.transformNode(node, options),
      isField
    )
  }

  /**
   * Transform single node, so they can be recognized by Formik.
   *
   * @param {*} node
   * @param {object} options
   * @param {function} [options.formatErrorMessage]
   * @param {function} options.setFieldValue
   * @param {function} options.handleBlur
   * @param {array} options.values
   * @param {array} options.touched
   * @param {array} options.errors
   *
   * @returns {*}
   */
  transformNode (node, options) {
    const { formatErrorMessage } = this.props
    const { setFieldValue, handleBlur, values, touched, errors } = options
    const { name, onChange, onBlur } = node.props

    // Omit adding node to Formik if it has no name property
    // but add it to children
    if (name == null) {
      return node
    }

    // Modify props of Field
    function _onChange (value) {
      setFieldValue(name, value)

      if (onChange) {
        onChange(value)
      }
    }

    function _onBlur (e) {
      handleBlur({ persist: noop, target: { name } })

      if (onBlur) {
        onBlur(e)
      }
    }

    return React.cloneElement(node, {
      ref: node.ref,
      value: values[name],
      error: touched[name] ? errors[name] : null,
      formatErrorMessage: node.props.formatErrorMessage || formatErrorMessage,
      onChange: _onChange,
      onBlur: _onBlur
    })
  }

  /**
   * Create form elements from children
   *
   * @param {object} props
   * @returns {React.Element}
   */
  renderForm = props => {
    const { handleSubmit } = props
    const {
      children, onSubmit, onChange,
      initialValues, values, validationSchema,
      FormComponent, ...passedProps
    } = this.props

    if (this.formik && onChange) {
      const nextValues = this.formik.getFormikBag().values

      if (nextValues !== this.values) {
        this.values = nextValues
        onChange(nextValues)
      }
    }

    const elements = this.buildNodesList(children, props)

    return (
      <FormComponent
        method='POST'
        onSubmit={handleSubmit}
        {...passedProps}>
        {elements}
      </FormComponent>
    )
  }

  /**
   * Handle form submitting
   *
   * @param args
   */
  submit = (...args) => {
    if (this.props.onSubmit) {
      this.props.onSubmit(...args)
    }
  }

  /**
   * Save reference to formik
   *
   * @param ref
   */
  saveRef = (ref) => {
    this.formik = ref
    this.values = ref ? ref.getFormikBag().values : null
  }

  render () {
    const {
      children, className, onSubmit, values,
      formatErrorMessage, FormComponent, ...passedProps
    } = this.props

    return (
      <Formik
        {...passedProps}
        initialValues={values}
        ref={this.saveRef}
        render={this.renderForm}
        onSubmit={this.submit}
      />
    )
  }
}

FormHandler.propTypes = propTypes
FormHandler.defaultProps = defaultProps

export default FormHandler