import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TableHead from './TableHead'
import TableRow from './TableRow'

import { css } from '@emotion/core'
import { equals, difference } from 'ramda'
import clsx from 'clsx'

export default class Table extends PureComponent {
    static propTypes = {
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                dataKey: PropTypes.string,
                label: PropTypes.string,
            })
        ).isRequired,
        rowCount: PropTypes.number.isRequired,
        rowGetter: PropTypes.func.isRequired,
    }

    state = {
        rowList: [],
    }

    componentDidMount() {
        const { rowCount, rowGetter } = this.props
        this.setState({
            rowList: this._getRowList(rowCount, rowGetter),
        })
    }
    componentDidUpdate(prevState) {
        const { rowCount, rowGetter } = this.props
        const { rowList: prevRowList } = prevState
        const rowList = this._getRowList(rowCount, rowGetter)

        if (!equals(prevRowList, rowList)) {
            this.setState({
                rowList: [...difference(prevRowList, rowList), ...rowList],
            })
        }
    }

    _getRowList = (rowCount, rowGetter) => {
        const rowList = []
        for (let index = 0; index < rowCount; index++) {
            const row = rowGetter(index)
            rowList.push(row)
        }
        return rowList
    }

    render() {
        const { className, columns, ...props } = this.props

        const classNames = clsx(className, 'table')

        const rowListRender = this._getRowList().map()

        return <div className={classNames} {...props} />
    }
}
