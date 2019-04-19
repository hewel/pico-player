import React, { Component } from 'react'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

import PlayList from '../Components/PlayList'
import ControlPanel from '../Components/ControlPanel'

import { uniq, curry } from 'ramda'
import clsx from 'clsx'

import fetch from 'utils/fetch'

import { initStyle } from './style.sass'
import 'assets/iconfont/iconfont.js'

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
    typography: {
        useNextVariants: true,
    },
})

export default class App extends Component {
    state = {
        songIdList: [
            4151839,
            3420341,
            1868486,
            26199445,
            37610440,
            509781585,
            26199445,
            26199445,
        ],
        nowPlayingSong: {},
        nowPlayingSongIndex: null,
        shouldPlayListShow: false,
    }
    componentDidMount = async () => {
        this.setState({
            songIdList: await getPlaylist(109323387),
        })
    }

    handlePlayListSelect = (index, detail) => {
        this.setState({ nowPlayingSongIndex: index, nowPlayingSong: detail })
    }
    handleSongSkip = (playMode, opposite) => {
        const { songIdList, nowPlayingSongIndex } = this.state
        this.setState({
            nowPlayingSongIndex: getNextSongIndex(
                nowPlayingSongIndex,
                songIdList.length,
                playMode,
                opposite
            ),
        })
    }
    handleAudioEnd = playMode => {
        const { songIdList, nowPlayingSongIndex } = this.state
        this.setState({
            nowPlayingSongIndex: getNextSongIndex(
                nowPlayingSongIndex,
                songIdList.length,
                playMode
            ),
        })
    }
    handleListShow = () => {
        this.setState(({ shouldPlayListShow }) => ({
            shouldPlayListShow: !shouldPlayListShow,
        }))
    }
    render() {
        const {
            songIdList,
            nowPlayingSong,
            nowPlayingSongIndex,
            shouldPlayListShow,
        } = this.state

        const playListClassName = clsx()

        return (
            <div id="app" className={initStyle}>
                <MuiThemeProvider theme={theme}>
                    <PlayList
                        className={shouldPlayListShow && 'show'}
                        idList={uniq(songIdList)}
                        songIndex={nowPlayingSongIndex}
                        onSelect={this.handlePlayListSelect}
                    />
                    <ControlPanel
                        songDetail={nowPlayingSong}
                        onSongSkip={this.handleSongSkip}
                        onAudioEnd={this.handleAudioEnd}
                        onListShow={this.handleListShow}
                    />
                </MuiThemeProvider>
            </div>
        )
    }
}

const getNextSongIndex = curry(
    (clamp, index, length, playMode = 0, opposite = false) => {
        const max = length - 1
        if (playMode === 0) {
            return opposite ? clamp(index - 1, max) : clamp(index + 1, max)
        }
        if (playMode === 1) {
            return index
        }
        if (playMode === 2) {
            return random(index, max)
        }
    }
)(clamp)

function clamp(value, max) {
    if (value > max) {
        return 0
    }
    if (value < 0) {
        return max
    }
    return value
}
function random(value, max) {
    const randomNum = Math.floor(Math.random() * max)
    if (value === randomNum) {
        return random(value, max)
    }
    return randomNum
}

function getPlaylist(id) {
    return fetch('/playlist/detail', { id }).then(res => {
        const tracks = res.playlist.tracks
        const idList = tracks.map(track => track.id)
        return idList
    })
}
