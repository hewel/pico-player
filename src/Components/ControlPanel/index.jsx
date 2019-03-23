import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/lab/Slider'
import blue from '@material-ui/core/colors/blue'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Album from '../Album'
import Icon from '../Icon'
import Audio from '../Audio'
import Progress from '../Progress'

import fetch from 'utils/fetch'
import formatAudioTime from 'utils/format'

import styles from './style.sass'

const theme = createMuiTheme({
    palette: {
        primary: blue
    },
    typography: {
        useNextVariants: true,
    }
})

export default class ControlPanel extends Component {
    state = {
        albumImageUrl: `https://p1.music.126.net/7tbeDDuTR_U_4F_u1qGKWQ==/2539871861205743.jpg`,
        songUrl: ``,
        songName: 'Lost In The Echo',
        songSinger: 'Linkin Park',
        isPlaying: false,
        playMode: 0,
        volume: 30,
        isMuted: false,
        audioCurrentTime: 0,
        audioDuration: 0,
    }

    componentWillMount = () => {
        fetchSongUrl({
            id: 4151839
        })
            .then(res => {
                this.setState({
                    songUrl: res
                })
            })
    }

    changePlayState = () => {
        this.setState(({ isPlaying }) => ({ isPlaying: !isPlaying }))
    }
    changePlayMode = () => {
        this.setState(({ playMode }) => {
            if (playMode == 2) {
                playMode = 0
            } else {
                playMode ++
            }
            return { playMode }
        })
    }
    changeVolume = (e, value) => {
        this.setState({
            volume: value
        })
    }
    muteVolume = () => {
        this.setState(({ isMuted }) => ({ isMuted: !isMuted }))
    }
    handleAudioPlay = (audioDuration, audioCurrentTime) => {
        this.setState({
            audioDuration,
            audioCurrentTime,
        })
    }
    render() {
        const {
            albumImageUrl,
            songUrl,
            songName,
            songSinger,
            isPlaying,
            playMode,
            volume,
            isMuted,
            audioCurrentTime,
            audioDuration,
        } = this.state
        const { ...props } = this.props

        const [playButtonSymbol, volumeSymbol, playModeSymbol, playCommand] = [
            isPlaying ? 'pause' : 'playarrow',
            isMuted ? 'volumeoff' : getVolumeSymbol(volume),
            getPlayModeSymbol(playMode),
            isPlaying ? 'pause' : 'play'
        ]

        // const [currentTime, duration] = [
        //     formatAudioTime(audioCurrentTime),
        //     formatAudioTime(audioDuration)
        // ]

        return (
            <MuiThemeProvider theme={theme}>
                <Paper className={styles.controlPanel} square {...props}>
                    <Progress
                        className={styles.progress}
                        currentTime={audioCurrentTime}
                        duration={audioDuration}
                    />
                    <Grid container spacing={32} className={styles.inner}>
                        <Grid item xs={2}>
                            <Album
                                className={styles.albumCell}
                                imageUrl={albumImageUrl}
                                songName={songName}
                            />
                        </Grid>
                        <Grid item xs={3} className={styles.songInfo}>
                            <span className={styles.songName}>{songName}</span>
                            <span className={styles.songSinger}>{songSinger}</span>
                        </Grid>
                        <Grid item xs={3} className={styles.controlButtonGroup}>
                            <Button color="primary"><Icon symbol="skipprevious" /></Button>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.changePlayState}
                            >
                                <Icon symbol={playButtonSymbol} />
                            </Button>
                            <Button color="primary"><Icon symbol="skipnext" /></Button>
                        </Grid>
                        <Grid item xs={4} className={styles.tuning}>
                            <Icon
                                className={styles.tuningIcon}
                                symbol={playModeSymbol}
                                onClick={this.changePlayMode}
                            />
                            <div className={styles.volumeControl}>
                                <Icon
                                    className={`${styles.tuningIcon} ${styles.volumeIcon}`}
                                    symbol={volumeSymbol}
                                    onClick={this.muteVolume}
                                />
                                <Slider
                                    value={volume}
                                    disabled={isMuted}
                                    onChange={this.changeVolume}
                                ></Slider>
                            </div>
                            <Icon className={styles.tuningIcon} symbol="queuemusic" />
                        </Grid>
                    </Grid>
                </Paper>
                <Audio
                    songUrl={songUrl}
                    playCommand={playCommand}
                    volume={volume}
                    isMuted={isMuted}
                    onAudioPlay={this.handleAudioPlay}
                />
            </MuiThemeProvider>
        )
    }
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

function fetchSongUrl(params) {
    return fetch('/song/url', params)
        .then(response => response.data[0].url)
}
