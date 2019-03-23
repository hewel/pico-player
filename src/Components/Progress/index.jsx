import React, { Component } from 'react'

import LinearProgress from '@material-ui/core/LinearProgress'
import Chip from '@material-ui/core/Chip'
import clsx from 'clsx'

import clamp from 'utils/clamp'
import formatAudioTime from 'utils/format'

import styles from './style.sass'

export default class Progress extends Component {
    state = {
        value: 0
    }
    componentDidUpdate = (prevProps, prevState) => {
        const { currentTime, duration } = this.props
        if (prevProps.currentTime !== currentTime) {
            this.setState({
                value: calculateValue(currentTime, duration)
            })
        }
    }


    handleProgressClick = (event) => {
        const node = event.currentTarget
        const value = calculatePercent(node, event)
        this.setState({ value })
    }
    render() {
        const { currentTime, duration, className } = this.props
        const { value } = this.state
        const classNames = clsx([className, styles.progress])
        return (
            <div className={classNames}>
                <LinearProgress
                    className={styles.progressBar}
                    variant="determinate"
                    value={value}
                    onClick={this.handleProgressClick}
                />
                <Chip
                    className={styles.thumb}
                    color="primary"
                    label={`${formatAudioTime(currentTime)}/${formatAudioTime(duration)}`}
                />
            </div>
        )
    }
}

function calculatePercent(node, event) {
    const { left, width } = node.getBoundingClientRect()
    const [offsetLeft, onePercent] = [
        left + global.pageXOffset,
        width / 100
    ]
    const offsetX = event.pageX - offsetLeft
    return clamp(offsetX / onePercent)
}
function calculateValue(currentTime, duration) {
    return clamp(currentTime / duration * 100) || 0
}
