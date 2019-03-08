import React, { Component } from 'react'
import { album, albumImg } from './style.sass'
import defAlbumImage from 'assets/music-cover.png'

export default class Album extends Component {
    state = {
        defAlbumImage,
        defSongName: '没有歌曲'
    }
    render() {
        const { className, imageUrl, songName, ...otherProps } = this.props
        const { defAlbumImage, defSongName } = this.state
        const [albumImageUrl, albumAlt, albumClassName] = [
            imageUrl || defAlbumImage,
            songName || defSongName,
            className ? `${album} ${className}` : album,
        ]

        return(
            <div className={albumClassName} {...otherProps}>
                <img
                    src={albumImageUrl}
                    alt={albumAlt}
                    className={`${albumImg}`}
                />
            </div>
        )
    }
}
