import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    tooltip: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[1],
    },
})

function ReTooltip(props) {
    const { children, ...other } = props
    return <Tooltip {...other}>{children}</Tooltip>
}

export default withStyles(styles)(ReTooltip)
