import React, { Component } from 'react'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

import PlayList from '../Components/PlayList'
import ControlPanel from '../Components/ControlPanel'

import { curry } from 'ramda'

import fetch from 'utils/fetch'

import { initStyle } from './style.sass'
import 'assets/iconfont/iconfont.js'

const theme = createMuiTheme({
    palette: {
        primary: blue
    },
    typography: {
        useNextVariants: true,
    }
})

export default class App extends Component {
    state = {
        songIdList: [4151839, 3420341, 1868486, 26199445, 37610440, 509781585, 26199445, 26199445],
        nowPlayingSong: {},
        nowPlayingSongIndex: null
    }
    componentDidMount = async () => {
        this.setState({
            songIdList: await getPlaylist(109323387)
        })
    }


    handlePlayListSelect = (detail) => {
        this.setState({ nowPlayingSong: detail})
    }
    handleAudioEnd = (index, playMode) => {
        const { songIdList } = this.state
        this.setState({
            nowPlayingSongIndex: getNextSongIndex(index, songIdList.length, playMode)
        })
    }

    render() {
        const { songIdList, nowPlayingSong, nowPlayingSongIndex } = this.state
        return (
            <div id="app" className={initStyle}>
                <MuiThemeProvider theme={theme}>
                    <PlayList
                      idList={songIdList}
                      songIndex={nowPlayingSongIndex}
                      onSelect={this.handlePlayListSelect}
                    />
                    <ControlPanel
                      songDetail={nowPlayingSong}
                      onAudioEnd={this.handleAudioEnd}
                    />
                </MuiThemeProvider>
            </div>
        )
    }
}

const getNextSongIndex = curry((clamp, index, length, playMode = 0, opposite = false) => {
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

})(clamp)

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
    const randomNum = parseInt(Math.random() * max)
    if (value === randomNum) {
        return random(value, max)
    }
    return randomNum
}

function getPlaylist(id) {
    return fetch('/playlist/detail', { id }).then(res => {
        const tracks = res.playlist.tracks
        return tracks.map(item => item.id)
    })
}
