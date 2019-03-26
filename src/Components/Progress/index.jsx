import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    componentDidUpdate = (prevProps) => {
        const { currentTime, duration } = this.props
        if (prevProps.currentTime !== currentTime) {
            this.setState({
                value: parseInt(clamp(currentTime / duration * 100)) || 0
            })
        }
    }

    handleProgressClick = (event) => {
        const node = event.currentTarget
        const value = calculatePercent(node, event)
        this.setState({ value }, () => {
            this.handleChange(value)
        })
    }
    handleChange = value => {
        const { duration, onChange } = this.props
        if (onChange) {
            onChange(calculateCurrentTime(value, duration))
        }
    }

    render() {
        const { currentTime, duration, className } = this.props
        const { value } = this.state
        const [classNames, chipLabel] = [
            clsx(className, styles.progress),
            `${formatAudioTime(currentTime)}/${formatAudioTime(duration)}`
        ]
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
                  label={chipLabel}
                  style={{
                        left: `${value}%`
                    }}
                />
            </div>
        )
    }
}

Progress.propTypes = {
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    onChange: PropTypes.func
}
Progress.defaultProps = {
    currentTime: 0,
    duration: 0
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
function calculateCurrentTime(percent, duration) {
    return (percent * duration / 100) || 0
}
