import React from 'react'
import PropTypes from 'prop-types'

import clsx from 'clsx'

import { album, albumImg } from './style.sass'
import defAlbumImage from 'assets/music-cover.png'

export default function Album(props) {
    const { className, imageUrl, songName, ...otherProps } = props
    const albumClassName = clsx(className, album)

    return (
        <div className={albumClassName} {...otherProps}>
            <img src={imageUrl} alt={songName} className={albumImg} />
        </div>
    )
}
Album.propTypes = {
    imageUrl: PropTypes.string,
    songName: PropTypes.string,
}
Album.defaultProps = {
    imageUrl: defAlbumImage,
    songName: '没有歌曲',
}
