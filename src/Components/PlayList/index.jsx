/* eslint-disable no-console */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
// import VirtualizedTable from './VirtualizedTable'
import Table from './Table'

import { css } from '@emotion/core'

import fetch from 'utils/fetch'
import format from 'utils/format'

import styles from './style.sass'

export default class PlayList extends PureComponent {
    state = {
        songDetailList: [],
        nowPlayingSongIndex: null,
        page: 0,
        rowsPerPage: 8,
        isFetched: false,
    }
    componentDidMount = () => {
        const { idList } = this.props
        if (idList) {
            this.fetchSongList()
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        const { songIndex: prevSongIndex, idList: prevIdList } = prevProps
        const { songIndex, idList } = this.props
        if (prevSongIndex !== songIndex) {
            this.setRowSelected(songIndex)
        }
        if (prevIdList !== idList) {
            this.fetchSongList()
        }
    }

    fetchSongList = async () => {
        const { idList } = this.props
        this.setState({ isFetched: false })
        const results = await Promise.all(
            idList.map(async id => getSongDetail(id))
        )
        this.setState({ songDetailList: results, isFetched: true })
        return true
    }

    handleOnRowSelect = (index, event) => {
        this.setRowSelected(index)
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
        const { songDetailList, nowPlayingSongIndex, isFetched } = this.state
        const columns = [
            { width: 200, dataKey: 'name', label: '歌曲' },
            { width: 120, dataKey: 'artist', label: '歌手' },
            { width: 120, dataKey: 'albumName', label: '专辑' },
            { width: 120, dataKey: 'duration', label: '时长', align: 'right' },
        ]
        return (
            <Paper
                square
                className={styles.playList}
                css={css`
                    width: 736px;
                    height: 368px;
                `}
            >
                <Table
                    columns={columns}
                    dataList={songDetailList}
                    isFetched={isFetched}
                    onRowSelect={this.handleOnRowSelect}
                    selectedRowIndex={nowPlayingSongIndex}
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
            duration: format(dt / 1000),
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
