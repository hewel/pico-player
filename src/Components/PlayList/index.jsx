import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import TableCell from './TableCell'


import fetch from 'utils/fetch'
import format from 'utils/format'

export default class PlayList extends Component {
    state = {
        songDetailList: [],
        nowPlayingSongIndex: null
    }
    componentDidMount = () => {
        const { idList } = this.props
        if (idList) {
            Promise.all(idList.map(async id => getSongDetail(id)))
                .then(results => {
                    this.setState({ songDetailList: results})
                })
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        const { songIndex: prevSongIndex } = prevProps
        const { songIndex } = this.props
        if (prevSongIndex !== songIndex) {
            this.setRowSelected(songIndex)
        }
    }

    handleRowDoubleClick = (index, event) => {
        event.preventDefault()
        this.setRowSelected(index)
    }
    setRowSelected = index => {
        const { songDetailList } = this.state
        const { onSelect } = this.props
        this.setState({ nowPlayingSongIndex: index }, () => {
            if (onSelect) {
                const { id, name, artists, albumPic } = songDetailList[index]
                onSelect({
                    index,
                    id,
                    name,
                    albumPic,
                    artist: joinArtistNames(artists)
                })
            }
        })
    }

    render() {
        const { songDetailList, nowPlayingSongIndex } = this.state
        return(
            <Paper square>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>歌曲</TableCell>
                            <TableCell>歌手</TableCell>
                            <TableCell>专辑</TableCell>
                            <TableCell align="right">时长</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {songDetailList.map((detail, index) => {
                            const { id, name, artists, albumName, duration, isPlaying } = detail
                            const selected = nowPlayingSongIndex === index
                            return (
                                <TableRow
                                  key={id}
                                  selected={selected}
                                  hover={true}
                                  onDoubleClick={this.handleRowDoubleClick.bind(this, index)}
                                >
                                    <TableCell scoop="row">{name}</TableCell>
                                    <TableCell>{joinArtistNames(artists)}</TableCell>
                                    <TableCell>{albumName}</TableCell>
                                    <TableCell align="right">{format(duration)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}
PlayList.propTypes = {
    idList: PropTypes.array,
    songIndex: PropTypes.number,
    onSelect: PropTypes.func
}

function getSongDetail(id) {
    return fetch('/song/detail', { ids: id })
        .then(res => {
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
                artists,
                duration: dt / 1000,
                publishTime,
                isPlaying: false
            }
        })
}

function joinArtistNames(artists=[]) {
    if (artists.length === 1) {
        return artists[0].name
    }
    const artistNames = artists.map(artist => artist.name)
    return artistNames.join(' & ')
}
