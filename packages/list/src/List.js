import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName, prefix } from '@talixo/shared'

/**
 * Component which represents List.
 *
 * @param {object} props
 * @param {string} [props.className]
 * @param {string|*} [props.bullet]
 * @param {*} [props.children]
 * @returns {React.Element}
 */
function List (props) {
  const { bullet, children, className, ...passedProps } = props

  const mappedChildren = React.Children.map(children, child => (
    <li>
      <span className={prefix('list', 'bullet')}>{bullet}</span>
      <span className={prefix('list', 'content')}>{child}</span>
    </li>
  ))

  return (
    <ul className={buildClassName('list', className)} {...passedProps}>
      {mappedChildren}
    </ul>
  )
}

List.propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Bullet to put before */
  bullet: PropTypes.node.isRequired,

  /** List of elements */
  children: PropTypes.node
}

export default List
