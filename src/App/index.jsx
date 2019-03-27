import React, { Component } from 'react'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

import ControlPanel from 'Components/ControlPanel'

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
        hello: 'hello world'
    }
    render() {
        return (
            <div id="app" className={initStyle}>
                <MuiThemeProvider theme={theme}>
                    <ControlPanel />
                </MuiThemeProvider>
            </div>
        )
    }
}

