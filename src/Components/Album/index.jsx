import React from 'react'
import { album, albumImg } from './style.sass'
import defAlbumImage from 'assets/music-cover.png'

export default function Album(props) {
    const { className, imageUrl, songName, ...otherProps } = props
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
