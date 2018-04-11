import React from 'react'
import PropTypes from 'prop-types'
import cls from 'classnames'

import { prefix } from '@talixo/shared'

const moduleName = prefix('heading')

/**
 * Component which represents heading in typography.
 *
 * @param {object} props
 * @param {number} [props.level]
 * @param {string} [props.className]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function Heading (props) {
  const { className, level, children, ...passedProps } = props

  // Calculate heading level
  const desiredLevel = Math.max(1, Math.min(level, 6))

  return React.createElement(`h${desiredLevel}`, {
    className: cls(moduleName, className),
    ...passedProps
  }, children)
}

Heading.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Heading level */
  level: PropTypes.number,

  /** Heading content */
  children: PropTypes.node
}

Heading.defaultProps = {
  level: 2
}

export default Heading