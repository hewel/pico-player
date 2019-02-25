import { h, Component } from 'preact'
import defAlbumImage from 'assets/music-cover.png'

export default class Album extends Component {
    state = {
        defAlbumImage,
        defSongName: '没有歌曲'
    }
    render(props, state) {
        const { imageUrl, songName } = props
        const { defAlbumImage, defSongName } = state
        const [ albumImageUrl, albumAlt ] = [
            imageUrl || defAlbumImage,
            songName || defSongName
        ]
        return(
            <div class="album">
                <img
                    src={albumImageUrl}
                    alt={albumAlt}
                    class="album-img"
                />
            </div>
        )
    }
}
