/* eslint-disable no-console */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Table from './Table'

import { css, keyframes } from '@emotion/core'
import clsx from 'clsx'
import localforage from 'localforage'

import fetch from 'utils/fetch'
import format from 'utils/format'

import styles from './style.sass'
const ANIMATE_DURATION = 400
const fadeInBottom = keyframes`
    0% {
        transform: translate3d(0,400px,0);
        opacity: 0;
    }
    50% {
        opacity: 0.2;
    }
    80%, 100% {
        opacity: 1;
    }
    100% {
        transform: translate3d(0,0,0);
    }
`
const fadeOutBottom = keyframes`
    0% {
        transform: translate3d(0,0,0);
        opacity: 1;
    }
    20% {
        opacity: 0.2;
    }
    50%, 100% {
        opacity: 0;
    }
    100% {
        transform: translate3d(0,400px,0);
    }
`

export default class PlayList extends PureComponent {
    state = {
        songDetailList: [],
        page: 0,
        rowsPerPage: 8,
        isFetched: false,
        isPlayListShow: false,
    }

    componentDidMount = () => {
        const { idList } = this.props
        if (idList) {
            localforage.getItem('songList').then(res => {
                if (res) {
                    this.setState({ songDetailList: res })
                } else {
                    this.fetchSongList()
                }
            })
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        const {
            songIndex: prevSongIndex,
            idList: prevIdList,
            shouldPlayListShow: prevShouldPlayListShow,
        } = prevProps
        const { songIndex, idList, shouldPlayListShow } = this.props
        if (prevSongIndex !== songIndex) {
            this.setRowSelected(songIndex)
        }
        if (prevIdList !== idList) {
            this.fetchSongList()
        }
        if (prevShouldPlayListShow !== shouldPlayListShow) {
            if (!shouldPlayListShow) {
                this.timer = setTimeout(() => {
                    this.setState(
                        {
                            isPlayListShow: shouldPlayListShow,
                        },
                        () => {
                            clearTimeout(this.timer)
                        }
                    )
                }, ANIMATE_DURATION)
            } else {
                this.setState({
                    isPlayListShow: shouldPlayListShow,
                })
            }
        }
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    fetchSongList = async () => {
        const { idList } = this.props
        this.setState({ isFetched: false })
        const results = await getSongDetail(idList.join(','))
        localforage.setItem('songList', results)
        this.setState({ songDetailList: results, isFetched: true })
        return true
    }

    handleOnRowSelect = (index, event) => {
        this.setRowSelected(index)
    }

    setRowSelected = index => {
        const { songDetailList } = this.state
        const { onSelect } = this.props
        if (onSelect) {
            const { id, name, artist, albumPic } = songDetailList[index]
            onSelect(index, {
                id,
                name,
                albumPic,
                artist,
            })
        }
    }

    render() {
        const { songDetailList, isFetched, isPlayListShow } = this.state
        const { className, songIndex, shouldPlayListShow } = this.props
        const columns = [
            { width: 200, dataKey: 'name', label: '歌曲' },
            { width: 120, dataKey: 'artist', label: '歌手' },
            { width: 120, dataKey: 'albumName', label: '专辑' },
            { width: 120, dataKey: 'duration', label: '时长', align: 'right' },
        ]
        const classNames = clsx(className, styles.playList)
        const animation = shouldPlayListShow ? fadeInBottom : fadeOutBottom
        const visibility = isPlayListShow ? 'visible' : 'hidden'
        return (
            <Paper
                square
                className={classNames}
                css={css`
                    visibility: ${visibility};
                    animation-duration: ${ANIMATE_DURATION}ms;
                    animation-name: ${animation};
                `}
            >
                <Table
                    columns={columns}
                    dataList={songDetailList}
                    isFetched={isFetched}
                    onRowSelect={this.handleOnRowSelect}
                    selectedRowIndex={songIndex}
                />
            </Paper>
        )
    }
}
PlayList.propTypes = {
    idList: PropTypes.array,
    songIndex: PropTypes.number,
    onSelect: PropTypes.func,
    shouldPlayListShow: PropTypes.bool,
}

function getSongDetail(ids) {
    return fetch('/song/detail', { ids: ids }).then(res => {
        return res.songs.map((song, index) => {
            const { id, name, al, ar, dt, publishTime } = song
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
    })
}

function joinArtistNames(artists = []) {
    if (artists.length === 1) {
        return artists[0].name
    }
    const artistNames = artists.map(artist => artist.name)
    return artistNames.join(' & ')
}
