import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { css } from '@emotion/core'

import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import { AutoSizer, Column, Table } from 'react-virtualized'
// import TableSortLabel from '@material-ui/core/TableSortLabel'

import clsx from 'clsx'
import format from 'utils/format'

const styles = theme => ({
    table: {
        fontFamily: theme.typography.fontFamily,
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    tableRow: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    noClick: {
        cursor: 'initial',
    },
})

const ReTableCell = ({ rowHeight, children, ...other}) => (
    <TableCell
      component="div"
      css={css`
        display: flex;
        align-items: center;
        flex: 1;
        height: ${rowHeight}px;
      `}
      {...other}
    >
        {children}
    </TableCell>
)
ReTableCell.propTypes = {
    rowHeight: PropTypes.number
}

class VirtualizedTable extends PureComponent {

    getRowClassName = () => {
        const { classes, rowClassName } = this.props
        return clsx(classes.tableRow, classes.flexContainer, rowClassName)
    }

    checkCellIsDate = (index) => {
        const { columns } = this.props
        return columns[index].isDate || false
    }

    cellRender = ({ cellData, columnIndex, dataKey }) => {
        const { rowHeight } = this.props
        const isDate = this.checkCellIsDate(columnIndex)
        const inner = isDate ? format(cellData) : cellData
        return (
            <ReTableCell
              variant="body"
              rowHeight={rowHeight}
              align={isDate ? 'right' : 'left'}
            >
                {inner}
            </ReTableCell>
        )
    }
    headerRender = ({ label, columnIndex }) => {
        const { headerHeight } = this.props
        const isDate = this.checkCellIsDate(columnIndex)
        return (
            <ReTableCell
              variant="head"
              rowHeight={headerHeight}
              align={isDate ? 'right' : 'left'}
            >
                {label}
            </ReTableCell>
        )
    }
    render() {
        const { columns, ...props } = this.props
        return(
            <AutoSizer>
                {({height, width}) => (
                    <Table
                      height={height}
                      width={width}
                      rowClassName={this.getRowClassName}
                    //   css={css`
                    //     display: flex;
                    //     align-items: center;
                    //     box-sizing: border-box;
                    //   `}
                      {...props}
                    >
                        {columns.map((item, index) => {
                            const { dataKey, ...other } = item
                            const headerRenderer = ({ label }) => this.headerRender({
                                label,
                                columnIndex: index
                            })
                            return (
                                <Column
                                  key={dataKey}
                                  dataKey={dataKey}
                                  headerRenderer={headerRenderer}
                                  cellRenderer={this.cellRender}
                                  {...other}
                                />
                            )
                        })}
                    </Table>
                )}
            </AutoSizer>
        )
    }
}
VirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
        })
    ),
    headerHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    rowClassName: PropTypes.string,
}
VirtualizedTable.defaultProps = {
    headerHeight: 56,
    rowHeight: 48
}
export default withStyles(styles)(VirtualizedTable)
