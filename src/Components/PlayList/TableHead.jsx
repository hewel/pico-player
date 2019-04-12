import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import TableCell from './TableCell'

import { css } from '@emotion/core'
import clsx from 'clsx'

export default class TableHead extends PureComponent {
    static propTypes = {
        headList: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                headHeight: PropTypes.number,
            })
        ).isRequired,
    }

    render() {
        const { headList, className, ...props } = this.props
        return (
            <div
                className={clsx(className, 'table-head')}
                css={css`
                    display: flex;
                `}
                {...props}
            >
                {headList.map(({ label, headHeight, ...other }, index) => (
                    <TableCell
                        key={index}
                        variant="head"
                        rowHeight={headHeight}
                        {...other}
                    >
                        {label}
                    </TableCell>
                ))}
            </div>
        )
    }
}
