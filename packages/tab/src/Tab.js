import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'

/**
 * Component which represents Tab.
 *
 * @param {object} props
 * @param {string} [props.active]
 * @param {*} [props.children]
 * @param {string} [props.className]
 * @returns {React.Element}
 */
function Tab (props) {
  const { active, children, className, ...passedProps } = props

  const clsName = buildClassName('tab', className, { active })

  return (
    <div className={clsName} {...passedProps}>
      {children}
    </div>
  )
}

Tab.propTypes = {
  /** Active state */
  active: PropTypes.bool,

  /** Tab content */
  children: PropTypes.node,

  /** Additional class name */
  className: PropTypes.string
}

Tab.defaultProps = {
  active: false
}

export default Tab
