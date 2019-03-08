import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/lab/Slider'
import blue from '@material-ui/core/colors/blue'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Album from 'Components/Album'
import Icon from 'Components/Icon'

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
        songName: 'Lost In The Echo',
        songSinger: 'Linkin Park',
        isPlaying: false,
        volume: 100,
        isMuted: false
    }
    changePlayState = () => {
        this.setState(({ isPlaying }) => ({ isPlaying: !isPlaying }))
    }
    changeVolume = (e, value) => {
        this.setState({
            volume: value
        })
    }
    muteVolume = () => {
        this.setState(({ isMuted }) => ({ isMuted: !isMuted }))
    }
    clickDemo = e => {
        console.log(1)
    }
    render() {
        const {
            albumImageUrl,
            songName,
            songSinger,
            isPlaying,
            volume,
            isMuted
        } = this.state
        const { ...props } = this.props

        const [playButtonSymbol, volumeSymbol ] = [
            isPlaying ? 'playarrow' : 'pause',
            isMuted ? 'volumeoff' : judgingVolume(volume),
        ]

        return (
            <MuiThemeProvider theme={theme}>
                <Paper className={styles.controlPanel} {...props}>
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
                            <div className={styles.volumeControl}>
                                <Icon className={`${styles.tuningIcon} ${styles.volumeIcon}`} symbol={volumeSymbol} onClick={this.muteVolume} />
                                <Slider
                                    value={volume}
                                    disabled={isMuted}
                                    onChange={this.changeVolume}
                                ></Slider>
                            </div>
                            <Icon className={styles.tuningIcon} symbol="repeat" />
                            <Icon className={styles.tuningIcon} symbol="playlistplay" />
                        </Grid>
                    </Grid>
                </Paper>
            </MuiThemeProvider>
        )
    }
}

function judgingVolume(value = 0) {
    if (!value) {
        return 'volumemute'
    } else if (value < 50) {
        return 'volumedown'
    } else {
        return 'volumeup'
    }
}
