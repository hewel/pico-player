import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TableHead from './TableHead'
import TableRow from './TableRow'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { css } from '@emotion/core'
import { equals } from 'ramda'
import clsx from 'clsx'

import style from './style.sass'

export default class Table extends PureComponent {
    static propTypes = {
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                dataKey: PropTypes.string,
                label: PropTypes.string,
            })
        ).isRequired,
        dataList: PropTypes.arrayOf(PropTypes.object).isRequired,
        isFetched: PropTypes.bool.isRequired,
        onRowSelect: PropTypes.func,
        selectedRowIndex: PropTypes.number,
    }

    state = {
        columnList: null,
    }
    listRef = React.createRef()

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.isFetched) {
    //         return true
    //     }
    //     return false
    // }

    componentDidUpdate(prevProps, prevState) {
        const { columnList: prevColumnList } = prevState
        const { columns, dataList, isFetched, selectedRowIndex } = this.props

        if (isFetched !== prevProps.isFetched && isFetched) {
            const updatedColumnList = this.getColumnList(columns, dataList)
            const isEqualed = equals(prevColumnList, updatedColumnList)
            if (!isEqualed) {
                this.setState({
                    columnList: updatedColumnList,
                })
            }
        }
        this.listRef.current.scrollToItem(selectedRowIndex, 'smart')
    }

    handleOnRowDbClick = (index, event) => {
        const { onRowSelect } = this.props
        event.preventDefault()
        if (onRowSelect) {
            onRowSelect(index, event)
        }
    }

    getHeadList = columns => columns.map(column => column.label)

    getColumnList = (columns, dataList) => {
        return dataList.map(data => {
            return columns.map(column => data[column.dataKey])
        })
    }
    getBackgroundColor = index => {
        const { selectedRowIndex } = this.props

        if (selectedRowIndex) {
            return index === selectedRowIndex
                ? '#e0e0e0'
                : index % 2 !== 0 && '#f4f4f4'
        }
        return index % 2 !== 0 && '#f4f4f4'
    }

    cellRender = (columnList, { index, style }) => {
        if (columnList) {
            const cellList = columnList ? columnList[index] : []
            const backgroundColor = this.getBackgroundColor(index) || ''
            const cssString = css`
                background-color: ${backgroundColor};
            `
            return (
                <TableRow
                    css={cssString}
                    cellList={cellList || []}
                    height={style.height}
                    style={{ top: style.top }}
                    onDoubleClick={this.handleOnRowDbClick.bind(this, index)}
                />
            )
        }
        return null
    }

    render() {
        const { className, columns, dataList, ...props } = this.props
        const { columnList } = this.state

        const classNames = clsx(className, style.tableScrollbar)

        const itemCount = dataList.length
        const headHeight = 48

        return (
            <AutoSizer>
                {({ height, width }) => (
                    <>
                        <TableHead
                            headList={this.getHeadList(columns)}
                            headHeight={headHeight}
                            width={width}
                        />
                        <List
                            className={classNames}
                            itemCount={itemCount}
                            ref={this.listRef}
                            height={height - headHeight}
                            width={width}
                            itemSize={32}
                            {...props}
                        >
                            {this.cellRender.bind(this, columnList)}
                        </List>
                    </>
                )}
            </AutoSizer>
        )
    }
}
