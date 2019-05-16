import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import ListItem from '@material-ui/core/ListItem'

import Scrollbar from 'react-scrollbars-custom'

import fetch from 'utils/fetch'
import joinArtistNames from 'utils/joinArtistNames'
import { formatAudioTime } from 'utils/format'

import style from './style.sass'

export default function SearchPage(props) {
    const { keywords } = props
    const [songs, setSongs] = useState([])
    const [songCount, setSongCount] = useState(0)
    useEffect(() => {
        fetchSearchResults(keywords).then(results => {
            setSongs(results.songs)
            setSongCount(results.songCount)
        })
    }, [keywords])
    const [offset, setOffset] = useState(0)

    const handleScrollEnd = scrollValues => {
        const { clientHeight, scrollHeight, scrollTop } = scrollValues
        const isScrollBottom = scrollTop > scrollHeight - clientHeight - 10
        // console.log(1)
    }

    return (
        <Scrollbar
            className={style.searchPageContainer}
            style={{ width: 736 }}
            onScrollEnd={handleScrollEnd}
        >
            {songs.map((result, index) => {
                const { name, artists, album, duration } = result
                return (
                    <ListItem key={index} component="span">
                        {name}-{artists}-{album}-{duration}
                    </ListItem>
                )
            })}
        </Scrollbar>
    )
}
SearchPage.propTypes = {
    keywords: PropTypes.string,
}

async function fetchSearchResults(keywords, limit = 20, offset = 0) {
    const { result } = await fetch('/search', {
        keywords,
        limit,
        offset,
    })
    const songs = result.songs.map(song => {
        const { id, name, artists, album, duration } = song
        return {
            id,
            name,
            artists: joinArtistNames(artists),
            album: album.name,
            duration: formatAudioTime(duration / 1000),
        }
    })
    return {
        songs,
        songCount: result.songCount || 0,
    }
}
