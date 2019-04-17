import React from 'react'
import PropTypes from 'prop-types'

import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import { css } from '@emotion/core'
import clsx from 'clsx'

const styles = theme => ({
    root: {
        borderBottom: 'none',
    },
    head: {
        color: theme.palette.common.white,
        fontSize: 14,
    },
})

const ReTableCell = ({
    variant,
    rowHeight,
    flexGrow,
    className,
    children,
    ...other
}) => {
    return (
        <TableCell
            className={clsx(className, 'table-cell')}
            component="div"
            variant={variant}
            css={css`
                display: flex;
                align-items: center;
                flex: 1;
                /* height: ${rowHeight}px; */
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            `}
            {...other}
        >
            {children}
        </TableCell>
    )
}
ReTableCell.propTypes = {
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    variant: PropTypes.string,
    flexGrow: PropTypes.number,
}
ReTableCell.defaultProps = {
    variant: 'body',
    rowHeight: 48,
}

export default withStyles(styles)(ReTableCell)
