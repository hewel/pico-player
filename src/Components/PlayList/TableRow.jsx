import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TableCell from './TableCell'
import Tooltip from '@material-ui/core/Tooltip'

import { css } from '@emotion/core'
import clsx from 'clsx'

export default class TableRow extends PureComponent {
    static propTypes = {
        cellList: PropTypes.array.isRequired,
        height: PropTypes.number,
    }

    render() {
        const { className, cellList, height, ...props } = this.props
        return (
            <div
                className={clsx(className, 'table-row')}
                css={css`
                    display: flex;
                    cursor: pointer;
                    height: ${height}px;
                    align-items: center;
                    transition: background-color 0.1s ease-in-out;
                    &:hover {
                        background-color: #e0e0e0;
                    }
                `}
                {...props}
            >
                {cellList.map((cell, index) => {
                    const align = index !== 0 ? 'right' : 'left'
                    const isTheLast = index === cellList.length - 1
                    const flex = isTheLast ? '' : '4'

                    const tabCell = (
                        <TableCell
                            key={index}
                            rowHeight={height}
                            align={align}
                            css={css`
                                flex: ${flex};
                            `}
                        >
                            {cell}
                        </TableCell>
                    )

                    if (isTheLast) {
                        return tabCell
                    } else {
                        return (
                            <Tooltip title={cell} enterDelay={500} interactive>
                                {tabCell}
                            </Tooltip>
                        )
                    }
                })}
            </div>
        )
    }
}
