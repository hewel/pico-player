import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TableCell from './TableCell'
import blue from '@material-ui/core/colors/blue'

import { css } from '@emotion/core'
import clsx from 'clsx'

export default class TableHead extends PureComponent {
    static propTypes = {
        headList: PropTypes.array,
        headHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        width: PropTypes.number,
    }

    render() {
        const { headList, headHeight, width, className, ...props } = this.props
        return (
            <div
                className={clsx(className, 'table-head')}
                css={css`
                    display: flex;
                    width: ${width}px;
                    height: ${headHeight}px;
                    background-color: ${blue[500]};
                    color: #fafafa;
                    padding-right: 10px;
                    align-items: center;
                `}
                {...props}
            >
                {headList.map((headLabel, index) => {
                    const align = index !== 0 ? 'right' : 'left'
                    const cssObj =
                        index === headList.length - 1
                            ? ''
                            : css`
                                  flex: 4;
                              `
                    return (
                        <TableCell
                            key={index}
                            variant="head"
                            align={align}
                            css={cssObj}
                        >
                            {headLabel}
                        </TableCell>
                    )
                })}
            </div>
        )
    }
}
