import React, { Component } from 'react'
import { album, albumImg } from './style.sass'
import defAlbumImage from 'assets/music-cover.png'

export default class Album extends Component {

    render() {
        const { className, imageUrl, songName, ...otherProps } = this.props
        const [albumImageUrl, albumAlt, albumClassName] = [
            imageUrl || defAlbumImage,
            songName || '没有歌曲',
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
