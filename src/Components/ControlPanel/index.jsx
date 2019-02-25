import { h, Component } from 'preact'
import LayoutGrid from 'preact-material-components/LayoutGrid'
import Album from 'Components/Album'
import { controlPanel } from './style.sass'
import 'preact-material-components/LayoutGrid/style.css'

export default class ControlPanel extends Component {
    state = {
        imgUrl: `https://p1.music.126.net/7tbeDDuTR_U_4F_u1qGKWQ==/2539871861205743.jpg`
    }
    render() {
        return (
            <LayoutGrid class={controlPanel}>
                <LayoutGrid.Inner>
                    <LayoutGrid.Cell>
                        <Album></Album>
                    </LayoutGrid.Cell>
                    <LayoutGrid.Cell></LayoutGrid.Cell>
                    <LayoutGrid.Cell></LayoutGrid.Cell>
                </LayoutGrid.Inner>
            </LayoutGrid>
        )
    }
}
