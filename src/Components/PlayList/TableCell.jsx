import React from 'react'
import PropTypes from 'prop-types'

import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    body: {
        'border-bottom': 'none'
    }
}

function ReTableCell(props) {
    const { classes, children, ...other } = props

    return (
        <TableCell classes={classes} {...other}>
            {children}
        </TableCell>
    )
}
ReTableCell.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ReTableCell)
