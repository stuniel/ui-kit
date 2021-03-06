import React from 'react'
import PropTypes from 'prop-types'

import { buildClassName } from '@talixo/shared'
import { Action, ActionsCell, Cell, Row } from '@talixo/table'

import { moduleName } from './config'

const propTypes = {
  /** Actions which can be applied to rows. */
  actions: PropTypes.arrayOf(PropTypes.shape({

    /** Function which indicates if button should be displayed.
     * Assigns item from data as function argument. */
    condition: PropTypes.func,

    /** Button icon name from `@talixo/icon` package. */
    icon: PropTypes.string.isRequired,

    /** Button label. */
    label: PropTypes.string.isRequired,

    /** onClick callback function. */
    onClick: PropTypes.func
  })),

  /** Information about columns which will be displayed in table. */
  columns: PropTypes.arrayOf(PropTypes.shape({

    /** Id of given column. */
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,

    /** Render function of items to be displayed in table cells of give column. */
    render: PropTypes.func
  })).isRequired,

  /** Render function of items to be displayed in table collapsible rows. */
  expandRender: PropTypes.func,

  /** Array should contain IDs of expanded rows. Its elements should be `id` properties of data items (if provided) or indexes of elements in data array. */
  expandedRows: PropTypes.array,

  /** Map object which holds ids of data items. */
  idStorage: PropTypes.object.isRequired,

  /** Row onClick callback function. */
  onClick: PropTypes.func,

  /** Data to be populated inside table. Require the same keys as inc olumns objects. */
  rowData: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** Indicates if actions should be displayed vertically or horizontally. */
  verticalActionCell: PropTypes.bool
}

const defaultProps = {
  actions: [],
  verticalActionCell: false
}
/**
 * Component which represents a row inside DataTable.
 *
 * @property {object} [props]
 * @property {object[]} [props.actions]
 * @property {function} [props.actions.condition]
 * @property {string} props.actions.icon
 * @property {string} props.actions.label
 * @property {function} [props.actions.onClick]
 * @property {object} props.columns
 * @property {number|string} props.columns.id
 * @property {function} [props.columns.render]
 * @property {function} [props.expandRender]
 * @property {array} [props.expandedRows]
 * @property {object} [props.idStorage]
 * @property {function} [props.onClick]
 * @property {object[]} props.rowData
 * @property {boolean} [props.verticalActionCell]
 *
 * @property {object} state
 * @property {array} state.expandedRows
 *
 * @class
 */
class TableRow extends React.Component {
  state = {
    expanded: this.props.expandedRows || []
  }

  /**
   * Handles changes of expaded rows from props.
   *
   * @param {object} nextProps
   * @param {array} nextProps.expandedRows
   * @param {object[]} nextProps.rowData
   */
  componentWillReceiveProps (nextProps) {
    const { expandedRows, rowData: newRowData } = nextProps
    const { rowData } = this.props
    const { expanded } = this.state

    if (expandedRows != null && expandedRows !== expanded) {
      this.setState({ expanded: expandedRows })
    }

    if (expandedRows == null && rowData !== newRowData) {
      this.setState({ expanded: [] })
    }
  }

  /**
   * Handles row click event and collapsing rows
   *
   * @param {object} row
   * @param {Event|SyntheticEvent} e
   */
  onClick = (row, e) => {
    const { onClick, expandedRows, idStorage } = this.props
    const { expanded } = this.state
    const rowId = idStorage.get(row)
    const inArray = expanded.indexOf(rowId) > -1

    if (onClick) {
      onClick(row, e)
    }

    if (expandedRows != null) { return }

    if (inArray) {
      const newExpanded = expanded.filter(item => item !== rowId)
      this.setState({ expanded: newExpanded })
    } else {
      this.setState((prevState) => ({ expanded: [...prevState.expanded, rowId] }))
    }
  }

  /**
   * This function generates action cell for passed row.
   *
   * @param {object[]} actions
   * @param {object} row
   * @param {boolean} [vertical]
   * @returns {React.Element}
   */
  generateActions = (row) => {
    const { actions, verticalActionCell: vertical } = this.props
    // Generate click function.
    const click = (onClick, e) => {
      if (onClick) onClick(row, e)
    }

    // Check condition provided by the user.
    const displayedActions = actions.filter(action => (
      action.condition && typeof action.condition === 'function'
        ? action.condition(row)
        : true
    ))

    return (
      <ActionsCell vertical={vertical}>
        {
          displayedActions.map(action => (
            <Action
              key={action.label}
              {...action}
              icon={action.icon}
              label={action.label}
              onClick={e => click(action.onClick, e)}
            />
          ))
        }
      </ActionsCell>
    )
  }

  /**
   * Generates collapsible rows
   *
   * @param {object} row
   * @param {number} colspan - indicates the width of element
   * @param {number} index - index of current element
   * @returns {React.Element}
   */
  generateCollapse = (row, colspan, index) => {
    const { expandRender, idStorage } = this.props
    const { expanded } = this.state
    const rowId = idStorage.get(row)
    // Check if current row is marked as expanded inside state
    const visible = expanded.indexOf(rowId) > -1
    const collapseCls = buildClassName([moduleName, 'collapse'], null, {
      collapsed: !visible,
      // This is called even to match rendered row order
      even: index % 2 !== 0
    })
    const collapseCellCls = buildClassName([moduleName, 'collapse', 'cell'])
    const collapse = expandRender(row)

    return (
      <React.Fragment>
        {
          collapse &&
          <Row className={collapseCls}>
            <Cell className={collapseCellCls} colSpan={colspan}>
              { collapse }
            </Cell>
          </Row>
        }
      </React.Fragment>
    )
  }

  render () {
    const { actions, columns, expandRender, expandedRows, onClick: click, idStorage, rowData, verticalActionCell, ...restProps } = this.props
    const { generateActions, generateCollapse, onClick } = this
    const cellCls = buildClassName([moduleName, 'cell'], null, { clickable: !!expandRender || !!click })
    // Indicates width of collapsible row
    const colSpan = columns.length
    // Filter columns to ensure actions will be displayed as last column.
    const cols = columns.filter(({ id }) => id !== 'actions')

    return (
      <React.Fragment>
        {
          rowData.map((row, i) => (
            <React.Fragment key={idStorage.get(row)}>
              <Row className={buildClassName([moduleName, 'row'], null, { even: i % 2 !== 0 })} {...restProps}>
                {
                  cols.map(({ id, render }) => (
                    <Cell className={cellCls} onClick={onClick.bind(this, row)} key={id}>
                      { render && typeof render === 'function' ? render(row[id], row, id) : row[id] }
                    </Cell>)
                  )
                }
                { actions.length > 0 && generateActions(row) }
              </Row>
              { expandRender && generateCollapse(row, colSpan, i) }
            </React.Fragment>
          ))
        }
      </React.Fragment>
    )
  }
}

TableRow.displayName = 'TableRow'

TableRow.propTypes = propTypes

TableRow.defaultProps = defaultProps

export default TableRow
