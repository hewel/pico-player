import React, { Component } from 'react'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

import PlayList from '../Components/PlayList'
import ControlPanel from '../Components/ControlPanel'

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
        songIdList: [4151839, 347230, 1868486, 26199445, 37610440],
        nowPlayingSong: {},
        nowPlayingSongIndex: null
    }
    handlePlayListSelect = (detail) => {
        this.setState({ nowPlayingSong: detail})
    }
    handleAudioEnd = index => {
        this.setState({
            nowPlayingSongIndex: index
        })
    }

    render() {
        const { songIdList, nowPlayingSong } = this.state
        return (
            <div id="app" className={initStyle}>
                <MuiThemeProvider theme={theme}>
                    <PlayList
                      idList={songIdList}
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

function getNextSongId(index, playMode=0, opposite=false) {

}
