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

    componentDidUpdate = prevProps => {
        const { playCommand, volume, isMuted, onAudioPlay } = prevProps
        const audioNode = this.audioRef.current
        const audioDuration = parseInt(audioNode.duration)

        if (playCommand !== this.props.playCommand) {
            if (playCommand == 'play') {
                audioNode.play()
                this.audioTimer = setInterval(() => {
                    const audioCurrentTime = parseInt(audioNode.currentTime)
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