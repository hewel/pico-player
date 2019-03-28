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
    //MARK: Component update
    componentDidUpdate = prevProps => {
        const { songUrl, playCommand, volume, isMuted, onAudioPlay, onAudioEnd } = this.props
        const [ prevPlayCommand, prevVolume, prevIsMuted ] = [
            prevProps.playCommand,
            prevProps.volume,
            prevProps.isMuted
        ]
        const audioNode = this.audioRef.current

        if (prevPlayCommand !== playCommand && songUrl) {
            if (prevPlayCommand == 'play') {
                audioNode.play()
                audioNode.volume = volume / 100
                this.audioTimer = setInterval(() => {
                    const { currentTime, duration, ended } = audioNode
                    if (onAudioPlay) {
                        onAudioPlay(duration, currentTime)
                    }
                    if (onAudioEnd && ended) {
                        onAudioEnd(ended)
                    }
                }, 100)
            }
            if (prevPlayCommand == 'pause') {
                audioNode.pause()
                clearInterval(this.audioTimer)
            }
        }
        if (prevVolume !== volume) {
            audioNode.volume = volume / 100
        }
        if (prevIsMuted !== isMuted) {
            audioNode.muted = isMuted
        }
    }
    componentWillUnmount = () => {
        clearInterval(this.audioTimer)
    }
    //MARK: Audio change currentTime function
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
// MARK: Component propTypes
Audio.propTypes = {
    songUrl: PropTypes.string,
    playCommand: PropTypes.string,
    volume: PropTypes.number,
    isMuted: PropTypes.bool,
    getChangFunc: PropTypes.func,
    onAudioPlay: PropTypes.func,
    onAudioEnd: PropTypes.func
}
// MARK: Component defaultProps
Audio.defaultProps = {
    playCommand: 'pause',
    volume: 20,
    isMuted: false
}
