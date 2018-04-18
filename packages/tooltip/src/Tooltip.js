import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { buildClassName } from '@talixo/shared'
import { Portal } from '@talixo/portal'

import { getPositionNearElement } from '../utils/position'

/**
 * Component which represents Tooltip.
 *
 * @property {object} props
 * @property {boolean} props.fade
 * @property {string} props.position
 * @property {string} [props.attachTo]
 * @property {boolean} [props.open]
 * @property {*} [props.children]
 * @property {string} [props.className]
 * @property {string} [props.color]
 * @property {number} [props.fadeTime]
 * @property {function} [props.render]
 * @property {object} [props.style]
 *
 * @property {object} state
 * @property {boolean} state.clicked
 * @property {boolean} state.open
 * @property {null|number} state.top
 * @property {null|number} state.left
 *
 * @property {Element} [el]
 */
class Tooltip extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      triggerOn: this.props.triggerOn,
      clicked: false,
      open: this.props.open,
      left: null,
      top: null
    }

    this.updatePosition = _.throttle(this.updatePosition, 10)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseClick = this.handleMouseClick.bind(this)
    this.setRef = this.setRef.bind(this)
  }

  componentDidMount () {
    this.updatePosition()
    window.addEventListener('resize', this.updatePosition)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updatePosition)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.position !== nextProps.position) this.updatePosition(nextProps)
    if (this.props.open !== nextProps.open) this.setState({ open: nextProps.open })
  }

  updatePosition (nextProps) {
    if (!this.el) return

    const { top, left } = getPositionNearElement(this.el, (nextProps && nextProps.position) || this.props.position)
    this.setState({ top, left })
  }

  handleMouseEnter () {
    if (!_.isUndefined(this.props.open)) return
    this.setState({ clicked: false, open: true })
    this.updatePosition()
  }

  handleMouseLeave () {
    if (!_.isUndefined(this.props.open)) return
    this.setState({ open: false })
    this.updatePosition()
  }

  handleMouseOver () {
    if (!_.isUndefined(this.props.open)) return
    if (!this.state.clicked && !this.state.open) this.setState({ open: true })
    this.updatePosition()
  }

  handleMouseClick () {
    if (!_.isUndefined(this.props.open)) return
    this.setState({ open: !this.state.open })
    this.updatePosition()
  }

  setRef (node) {
    this.el = node
  }

  /**
  * @returns {React.Element}
  */
  render () {
    const {
      children, className, color, fade, fadeTime,
      position, render, attachTo, style, triggerOn, isArrow
    } = this.props

    const defaultFadeTime = 600
    const transition = fade ? { transition: `opacity ${fadeTime || defaultFadeTime}ms` } : null

    const childWithRef = React.Children.only(children)
      ? React.Children.map(children, child =>
        React.cloneElement(child, {
          ref: node => this.setRef(node)
        }))
      : null

    const wrapperClasses = buildClassName([ 'tooltip', 'wrapper' ], className)
    const fadeClasses = buildClassName(['tooltip', 'fade'], className)

    const nameClasses = buildClassName('tooltip', className, [ color, position, triggerOn, isArrow ? 'arrow' : null ])

    const tooltipStyle = {
      top: this.state.top,
      left: this.state.left,
      ...transition,
      ...style
    }

    return (
      <div
        className={wrapperClasses}
        onClick={this.props.triggerOn === 'click' ? this.handleMouseClick : null}
        onMouseEnter={this.props.triggerOn === 'hover' ? this.handleMouseEnter : null}
        onMouseLeave={this.props.triggerOn === 'hover' ? this.handleMouseLeave : null}
        onMouseOver={this.props.triggerOn === 'hover' ? this.handleMouseOver : null}
      >
        {childWithRef}
        <TransitionGroup>
          {this.state.open ? (
            <CSSTransition timeout={fade ? fadeTime || defaultFadeTime : 0} classNames={fadeClasses}>
              <Portal attachTo={attachTo}>
                <span className={nameClasses} style={tooltipStyle}>
                  {render(this.state)}
                </span>
              </Portal>
            </CSSTransition>
          ) : null}
        </TransitionGroup>
      </div>
    )
  }
}

Tooltip.propTypes = {
  /** Tooltipped elements */
  children: PropTypes.node,

  /** Additional class name passed to the tooltip */
  className: PropTypes.string,

  /** Color of the tooltip */
  color: PropTypes.string,

  /** Fade in / out animation */
  fade: PropTypes.bool,

  /** Fade time */
  fadeTime: PropTypes.number,

  /** Controls whether tooltip is open */
  open: PropTypes.bool,

  /** Tooltip position */
  position: PropTypes.oneOf([ 'left', 'right', 'top', 'bottom' ]),

  /** Renders tooltip content */
  render: PropTypes.func.isRequired,

  /** Root element of tooltip portal */
  attachTo: PropTypes.string,

  /** Additional styles passed to the tooltip */
  style: PropTypes.object,

  /* Show arrow next to tolltip */
  isArrow: PropTypes.bool,

  /** Type of event to open tooltip  */
  triggerOn: PropTypes.oneOf([ 'hover', 'click' ])
}

Tooltip.defaultProps = {
  fade: false,
  position: 'right',
  isArrow: true,
  triggerOn: 'hover'
}

export default Tooltip
