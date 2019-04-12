import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/lab/Slider'

import clsx from 'clsx'

import Album from '../Album'
import Icon from '../Icon'
import Audio from '../Audio'
import Progress from '../Progress'

import fetch from 'utils/fetch'

import styles from './style.sass'

export default class ControlPanel extends PureComponent {
    state = {
        songUrl: ``,
        isPlaying: false,
        playMode: 0,
        volume: 30,
        isMuted: false,
        audioCurrentTime: 0,
        audioDuration: 0,
    }

    // componentDidMount = () => {
    //     const { songDetail } = this.props
    //     const id = songDetail.id
    //     if (id) {
    //         getSongUrl(id)
    //             .then(res => {
    //                 this.setState({
    //                     songUrl: res
    //                 })
    //             })
    //     }
    // }
    componentDidUpdate = (prevProps, prevState) => {
        const { songDetail } = this.props
        const [id, prevId] = [songDetail.id, prevProps.songDetail.id]
        if (id !== prevId) {
            this.setState({ isPlaying: false })
            getSongUrl(id).then(res => {
                this.setState({
                    isPlaying: true,
                    songUrl: res,
                })
            })
        }
    }

    //MARK: Change state functions
    changePlayState = () => {
        this.setState(({ isPlaying }) => ({ isPlaying: !isPlaying }))
    }
    changePlayMode = () => {
        this.setState(({ playMode }) => {
            if (playMode == 2) {
                playMode = 0
            } else {
                playMode++
            }
            return { playMode }
        })
    }
    changeVolume = (e, value) => {
        this.setState({
            volume: value,
        })
    }
    //MARK: Event functions
    muteVolume = () => {
        this.setState(({ isMuted }) => ({ isMuted: !isMuted }))
    }
    handleAudioPlay = (audioDuration, audioCurrentTime) => {
        this.setState({
            audioDuration,
            audioCurrentTime,
        })
    }
    handleAudioEnd = () => {
        const { playMode } = this.state
        const { songDetail, onAudioEnd } = this.props
        this.setState({ isPlaying: false })
        if (onAudioEnd) {
            onAudioEnd(songDetail.index, playMode)
        }
        if (playMode === 1) {
            this.setState({ isPlaying: true })
        }
    }
    handelGetChangeFunc = func => {
        this.changeCurrentTime = func
    }
    handleProgressChange = value => {
        this.changeCurrentTime(value)
    }
    render() {
        const {
            songUrl,
            isPlaying,
            playMode,
            volume,
            isMuted,
            audioCurrentTime,
            audioDuration,
        } = this.state
        const { songDetail, className, onAudioEnd, ...props } = this.props
        const { name, albumPic, artist } = songDetail

        const [playButtonSymbol, volumeSymbol, playModeSymbol, playCommand] = [
            isPlaying ? 'pause' : 'playarrow',
            isMuted ? 'volumeoff' : getVolumeSymbol(volume),
            getPlayModeSymbol(playMode),
            isPlaying ? 'pause' : 'play',
        ]

        // const [currentTime, duration] = [
        //     formatAudioTime(audioCurrentTime),
        //     formatAudioTime(audioDuration)
        // ]

        return (
            <>
                <Paper
                    className={clsx(styles.controlPanel, className)}
                    square
                    {...props}
                >
                    <Progress
                        className={styles.progress}
                        currentTime={audioCurrentTime}
                        duration={audioDuration}
                        onChange={this.handleProgressChange}
                    />
                    <Grid container spacing={32} className={styles.inner}>
                        <Grid item xs={2}>
                            <Album
                                className={styles.albumCell}
                                imageUrl={albumPic}
                                songName={name}
                            />
                        </Grid>
                        <Grid item xs={3} className={styles.songInfo}>
                            <span className={styles.songName}>{name}</span>
                            <span className={styles.songSinger}>{artist}</span>
                        </Grid>
                        <Grid item xs={3} className={styles.controlButtonGroup}>
                            <Button color="primary">
                                <Icon symbol="skipprevious" />
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.changePlayState}
                            >
                                <Icon symbol={playButtonSymbol} />
                            </Button>
                            <Button color="primary">
                                <Icon symbol="skipnext" />
                            </Button>
                        </Grid>
                        <Grid item xs={4} className={styles.tuning}>
                            {/* <div className={styles.time}>
                                <span>{currentTime}</span>
                                <span>{duration}</span>
                            </div> */}
                            <Icon
                                className={styles.tuningIcon}
                                symbol={playModeSymbol}
                                onClick={this.changePlayMode}
                            />
                            <div className={styles.volumeControl}>
                                <Icon
                                    className={`${styles.tuningIcon} ${
                                        styles.volumeIcon
                                    }`}
                                    symbol={volumeSymbol}
                                    onClick={this.muteVolume}
                                />
                                <Slider
                                    value={volume}
                                    disabled={isMuted}
                                    onChange={this.changeVolume}
                                />
                            </div>
                            <Icon
                                className={styles.tuningIcon}
                                symbol="queuemusic"
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <Audio
                    songUrl={songUrl}
                    playCommand={playCommand}
                    volume={volume}
                    isMuted={isMuted}
                    onAudioPlay={this.handleAudioPlay}
                    onAudioEnd={this.handleAudioEnd}
                    getChangFunc={this.handelGetChangeFunc}
                />
            </>
        )
    }
}
// MARK: Component propTypes
ControlPanel.propTypes = {
    songDetail: PropTypes.object.isRequired,
    onAudioEnd: PropTypes.func,
}

function getVolumeSymbol(value = 0) {
    if (!value) {
        return 'volumemute'
    } else if (value < 50) {
        return 'volumedown'
    } else {
        return 'volumeup'
    }
}
function getPlayModeSymbol(value = 0) {
    const modeSymbolArr = ['repeat', 'repeatone', 'shuffle']
    return modeSymbolArr[value]
}

function getSongUrl(id) {
    return fetch('/song/url', { id }).then(response => response.data[0].url)
}
