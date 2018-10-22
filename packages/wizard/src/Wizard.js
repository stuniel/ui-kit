import React from 'react'
import PropTypes from 'prop-types'

import { Navigation, ControlledPagination } from '@talixo/navigation'
import { buildClassName } from '@talixo/shared'

const propTypes = {
  /** Additional class name */
  className: PropTypes.string,

  /** Children inside Wizard. Each child is the next step in Wizard */
  children: PropTypes.node.isRequired,

  /** Maximum number of displayed page buttons */
  displayedLimit: PropTypes.number,

  /** Next button label */
  nextLabel: PropTypes.node,

  /** Previous button label */
  previousLabel: PropTypes.node,

  /** Step from which wizard should start */
  defaultStep: PropTypes.number,

  /** Show pagination in Wizard */
  pagination: PropTypes.bool,

  /** Pagination Props */
  paginationProps: PropTypes.object
}

const defaultProps = {
  pagination: true
}

/**
 * Component which represents Wizard.
 *
 * @property {object} props
 * @property {string} [props.className]
 * @property {*} [props.children]
 * @property {number} [props.displayedLimit]
 * @property {string} [props.nextLabel]
 * @property {string} [props.previousLabel]
 * @property {number} [props.step]
 * @class {React.Element}
 */
class Wizard extends React.PureComponent {
  state = {
    currentStep: this.props.step || 1
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.step && nextProps.step !== this.state.currentStep) {
      this.setState({
        currentStep: nextProps.step
      })
    }
  }

  render () {
    const {children, className, displayedLimit, nextLabel, previousLabel, pagination, paginationProps, ...passedProps} = this.props
    const {currentStep} = this.state
    const element = React.Children.toArray(children)
    return (
      <div className={buildClassName('wizard', className)} {...passedProps} >
        {element[currentStep - 1]}
        {pagination && <Navigation type='pagination' >
          <ControlledPagination
            activePage={currentStep}
            onChange={i => this.setState({ currentStep: i })}
            pageCount={element.length}
            {...paginationProps}
          />
        </Navigation>}
      </div>
    )
  }
}

Wizard.displayName = 'Wizard'
Wizard.propTypes = propTypes
Wizard.defaultProps = defaultProps

export default Wizard
