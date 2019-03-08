import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Album from 'Components/Album'
import Icon from 'Components/Icon'
import styles from './style.sass'

export default class ControlPanel extends Component {
    state = {
        albumImageUrl: `https://p1.music.126.net/7tbeDDuTR_U_4F_u1qGKWQ==/2539871861205743.jpg`,
        songName: `Lost In The Echo`,
        songSinger: `Linkin Park`,
        isPlaying: false
    }
    changePlayState = () => {
        const { isPlaying } = this.state
        this.setState({ isPlaying: !isPlaying})
    }
    clickDemo = e => {
        console.log(1)
    }
    render() {
        const {
            albumImageUrl,
            songName,
            songSinger,
            isPlaying
        } = this.state
        const { ...props } = this.props
        const playButtonSymbol = isPlaying ? `playarrow` : `pause`
        return (
            <Paper className={styles.controlPanel} {...props}>
                <Grid container className={styles.inner}>
                    <Grid item xs={2} className={styles.albumCell}>
                        <Album
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
                        <Button color="primary" onClick={this.changePlayState}><Icon symbol={playButtonSymbol} /></Button>
                        <Button color="primary"><Icon symbol="skipnext" /></Button>
                    </Grid>
                    <Grid item xs={4} className={styles.tunings}>
                        <Icon symbol="volumeup" onClick={this.clickDemo} />
                        <Icon symbol="repeat" />
                        <Icon symbol="playlistplay" />
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
