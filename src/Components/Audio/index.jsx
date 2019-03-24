import React, { Component } from 'react'

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
        const { playCommand, volume, isMuted, onAudioPlay } = prevProps
        const audioNode = this.audioRef.current
        const audioDuration = audioNode.duration

        if (playCommand !== this.props.playCommand) {
            if (playCommand == 'play') {
                audioNode.play()
                this.audioTimer = setInterval(() => {
                    const audioCurrentTime = audioNode.currentTime
                    onAudioPlay(audioDuration, audioCurrentTime)
                }, 100)

            }
            if (playCommand == 'pause') {
                audioNode.pause()
                clearInterval(this.audioTimer)
            }
        }
        if (volume !== this.props.volume) {
            audioNode.volume = volume / 100
        }
        if (isMuted !== this.props.isMuted) {
            audioNode.muted = !isMuted
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
