import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TableCell from './TableCell'

import { css } from '@emotion/core'
import clsx from 'clsx'

export default class TableRow extends PureComponent {
    static propTypes = {
        rowList: PropTypes.arrayOf(
            PropTypes.shape({
                data: PropTypes.array,
                rowHeight: PropTypes.number,
            })
        ).isRequired
    }

    render() {
        const { rowList, className, ...props } = this.props
        return (
            <div
              className={clsx(className, 'table-row')}
              css={css`
                display: flex;
              `}
              {...props}
            >
                {rowList.map(({ data, rowHeight}, index) => (
                    <TableCell
                      key={index}
                      rowHeight={rowHeight}
                    >
                        {data}
                    </TableCell>
                ))}
            </div>
        )
    }
}
