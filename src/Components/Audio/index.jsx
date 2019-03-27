import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Audio extends Component {

    audioRef = React.createRef()

    // shouldComponentUpdate = () => {
    //     const isAudioReady = this.audioRef.current.readyState == 4
    //     if (isAudioReady) {
    //         return true
    //     }
    //     return false
    // }
    componentDidMount = () => {
        const { getChangFunc } = this.props
        if (getChangFunc) {
            getChangFunc(this.changeCurrentTime)
        }
    }

    componentDidUpdate = prevProps => {
        const { playCommand, volume, isMuted } = this.props
        const [ prevPlayCommand, prevVolume, prevIsMuted ] = [
            prevProps.playCommand,
            prevProps.volume,
            prevProps.isMuted
        ]
        const audioNode = this.audioRef.current
        const { duration } = audioNode

        if (prevPlayCommand !== playCommand) {
            if (prevPlayCommand == 'play') {
                audioNode.play()
                audioNode.volume = volume / 100
                this.audioTimer = setInterval(() => {
                    const { currentTime, ended } = audioNode
                    prevProps.onAudioPlay(duration, currentTime, ended)
                }, 100)
            }
            if (prevPlayCommand == 'pause') {
                audioNode.pause()
                clearInterval(this.audioTimer)
            }
        }
        if (prevVolume !== volume) {
            audioNode.volume = prevVolume / 100
        }
        if (prevIsMuted !== isMuted) {
            audioNode.muted = !prevIsMuted
        }
    }
    componentWillUnmount = () => {
        clearInterval(this.audioTimer)
    }
    changeCurrentTime = value => {
        const audioNode = this.audioRef.current
        audioNode.currentTime = value
    }

    render() {
        const { songUrl } = this.props

        return (
            <audio
              src={songUrl}
              ref={this.audioRef}
            />
        )
    }
}
Audio.propTypes = {
    songUrl: PropTypes.string,
    playCommand: PropTypes.string,
    volume: PropTypes.number,
    isMuted: PropTypes.bool,
    getChangFunc: PropTypes.func,
    onAudioPlay: PropTypes.func
}
Audio.defaultProps = {
    playCommand: 'pause',
    volume: 20,
    isMuted: false
}
