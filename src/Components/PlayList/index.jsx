/* eslint-disable no-console */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import VirtualizedTable from './VirtualizedTable'

import fetch from 'utils/fetch'

export default class PlayList extends PureComponent {
    state = {
        songDetailList: [],
        nowPlayingSongIndex: null,
        page: 0,
        rowsPerPage: 8,
    }
    componentDidMount = () => {
        const { idList } = this.props
        if (idList) {
            Promise.all(idList.map(async id => getSongDetail(id))).then(
                results => {
                    this.setState({ songDetailList: results })
                }
            )
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        const { songIndex: prevSongIndex, idList: prevIdList } = prevProps
        const { songIndex, idList } = this.props
        if (prevSongIndex !== songIndex) {
            this.setRowSelected(songIndex)
        }
        if (prevIdList !== idList) {
            Promise.all(idList.map(async id => getSongDetail(id))).then(
                results => {
                    this.setState({ songDetailList: results })
                }
            )
        }
    }

    handleRowDoubleClick = (index, event) => {
        event.preventDefault()
        this.setRowSelected(index)
    }
    handlePageChange = (event, page) => {
        this.setState({ page })
    }
    setRowSelected = index => {
        const { songDetailList } = this.state
        const { onSelect } = this.props
        this.setState({ nowPlayingSongIndex: index }, () => {
            if (onSelect) {
                const { id, name, artist, albumPic } = songDetailList[index]
                onSelect({
                    index,
                    id,
                    name,
                    albumPic,
                    artist,
                })
            }
        })
    }
    demoEventFunc = (column, data) => {
        console.log(column, data)
    }
    render() {
        const {
            songDetailList,
            nowPlayingSongIndex,
            page,
            rowsPerPage,
        } = this.state
        const columns = [
            { width: 200, dataKey: 'name', label: '歌曲', flexGrow: 2.0 },
            { width: 120, dataKey: 'artist', label: '歌手', flexGrow: 1.0 },
            { width: 120, dataKey: 'albumName', label: '专辑', flexGrow: 1.0 },
            { width: 120, dataKey: 'duration', label: '时长', isDate: true },
        ]
        return (
            <Paper square style={{ height: 400, width: '100%' }}>
                <VirtualizedTable
                    rowCount={songDetailList.length}
                    rowGetter={({ index }) => songDetailList[index]}
                    columns={columns}
                    onRowClick={({ index, event }) =>
                        this.setRowSelected(index)
                    }
                />
            </Paper>
        )
    }
}
PlayList.propTypes = {
    idList: PropTypes.array,
    songIndex: PropTypes.number,
    onSelect: PropTypes.func,
}

function getSongDetail(id) {
    return fetch('/song/detail', { ids: id }).then(res => {
        const { name, al, ar, dt, publishTime } = res.songs[0]
        const artists = ar.map(artist => {
            const { id, name } = artist
            return { id, name }
        })
        return {
            id,
            name,
            albumId: al.id,
            albumName: al.name,
            albumPic: al.picUrl,
            artist: joinArtistNames(artists),
            duration: dt / 1000,
            publishTime,
        }
    })
}

function joinArtistNames(artists = []) {
    if (artists.length === 1) {
        return artists[0].name
    }
    const artistNames = artists.map(artist => artist.name)
    return artistNames.join(' & ')
}

function checkSongCanPlay(id) {
    return fetch('/check/music', { id }).then(res => res.success)
}
