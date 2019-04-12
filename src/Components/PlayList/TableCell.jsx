import React from 'react'
import PropTypes from 'prop-types'

import TableCell from '@material-ui/core/TableCell'
import { css } from '@emotion/core'
import clsx from 'clsx'

const ReTableCell = ({
    variant,
    rowHeight,
    flexGrow,
    className,
    children,
    ...other
}) => {
    const isBody = variant == 'body'
    const flexGrowCss = flexGrow && `flex-grow: ${flexGrow};`

    return (
        <TableCell
            className={clsx(className, 'table-cell')}
            component="div"
            variant={variant}
            css={css`
            display: flex;
            align-items: center;
            flex: 1;
            ${flexGrowCss}
            height: ${rowHeight}px;
            ${isBody && 'border-bottom: 0;'}
          `}
            {...other}
        >
            {children}
        </TableCell>
    )
}
ReTableCell.propTypes = {
    rowHeight: PropTypes.number,
    variant: PropTypes.string.isRequired,
    flexGrow: PropTypes.number,
}
ReTableCell.defaultProps = {
    rowHeight: 48,
}

export default ReTableCell
