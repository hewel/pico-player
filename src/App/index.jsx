import { h, Component } from 'preact'
import ControlPanel from 'Components/ControlPanel'
import { initStyle } from './style.sass'

export default class App extends Component {
    state = {
        hello: 'hello world'
    }
    render(props, state) {
        return (
            <div id="app" class={initStyle}>
                <ControlPanel />
            </div>
        )
    }
}

