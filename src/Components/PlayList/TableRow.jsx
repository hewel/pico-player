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
                    const isTheFirst = index === 0
                    const align = isTheFirst ? 'left' : 'right'
                    const placement = isTheFirst ? 'bottom' : 'bottom-end'
                    const isTheLast = index === cellList.length - 1
                    const flex = isTheLast ? '' : '4'

                    const tabCell = index => (
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
                        return tabCell(index)
                    } else {
                        return (
                            <Tooltip
                                title={cell}
                                key={index}
                                placement={placement}
                                enterDelay={500}
                                leaveDelay={100}
                                interactive
                            >
                                {tabCell(null)}
                            </Tooltip>
                        )
                    }
                })}
            </div>
        )
    }
}
