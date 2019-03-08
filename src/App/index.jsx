import React, { Component } from 'react'
import ControlPanel from 'Components/ControlPanel'
import { initStyle } from './style.sass'
import 'assets/iconfont/iconfont.js'

export default class App extends Component {
    state = {
        hello: 'hello world'
    }
    render() {
        return (
            <div id="app" className={initStyle}>
                <ControlPanel />
            </div>
        )
    }
}

