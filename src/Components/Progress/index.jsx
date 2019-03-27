import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LinearProgress from '@material-ui/core/LinearProgress'
import Chip from '@material-ui/core/Chip'

import clsx from 'clsx'

import clamp from 'utils/clamp'
import formatAudioTime from 'utils/format'

import styles from './style.sass'

export default class Progress extends Component {
    progressRef = React.createRef()

    state = {
        value: 0,
        isThumbMouseDown: false
    }

    componentDidUpdate = (prevProps) => {
        const { currentTime, duration } = this.props
        const { isThumbMouseDown } = this.state
        if (prevProps.currentTime !== currentTime && !isThumbMouseDown) {
            this.setState({
                value: parseFloat(clamp(currentTime / duration * 100)) || 0
            })
        }
    }
    componentWillUnmount = () => {
        this.removeMouseEvent()
    }

    addMouseEvent = () => {
        document.body.addEventListener('mouseup', this.handleMouseUp)
        document.body.addEventListener('mousemove', this.handleMouseMove)
    }
    removeMouseEvent = () => {
        document.body.removeEventListener('mouseup', this.handleMouseUp)
        document.body.removeEventListener('mousemove', this.handleMouseMove)
    }

    handleProgressClick = (event) => {
        const node = event.currentTarget
        const value = calculatePercent(node, event)
        this.setState({ value }, () => {
            this.handleChange(value)
        })
    }
    handleThumbMouseDown = event => {
        event.preventDefault()
        this.setState({ isThumbMouseDown: true })
        this.addMouseEvent()
    }
    handleMouseMove = event => {
        const node = this.progressRef.current
        const value = calculatePercent(node, event)
        this.setState({ value })
    }
    handleMouseUp = () => {
        const { value } = this.state
        this.setState({ isThumbMouseDown: false }, () => {
            this.removeMouseEvent()
        })
        this.handleChange(value)
    }
    handleChange = value => {
        const { duration, onChange } = this.props
        if (onChange) {
            onChange(calculateCurrentTime(value, duration))
        }
    }

    render() {
        const { currentTime, duration, className } = this.props
        const { value, isThumbMouseDown } = this.state

        const [classNames, thumbStyle] = [
            clsx(className, styles.progress),
            { transform: `translate3D(${value}%, 0, 0)` }
        ]
        const isEnd = (currentTime == 0 || currentTime == duration)
        const chipLabel = isEnd ? null : `${formatAudioTime(currentTime)}/${formatAudioTime(duration)}`

        return (
            <div className={classNames} ref={this.progressRef}>
                <LinearProgress
                  className={styles.progressBar}
                  variant="determinate"
                  value={value}
                  onClick={isEnd ? null : this.handleProgressClick}
                  is-mouse-down={isThumbMouseDown.toString()}
                />
                <div
                  className={styles.thumb}
                  style={thumbStyle}
                  onMouseDown={isEnd ? null : this.handleThumbMouseDown}
                  is-mouse-down={isThumbMouseDown.toString()}
                >
                    <Chip
                      className={styles.chip}
                      color="primary"
                      label={chipLabel}
                      is-end={isEnd.toString()}
                    />
                </div>
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
