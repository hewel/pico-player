import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Autosuggest from 'react-autosuggest'

import { isEmpty, pipe, map, toPairs, pick, prop } from 'ramda'

import fetch from 'utils/fetch'

function SearchBar(props) {
    const [suggestions, setSuggestions] = useState([])
    const handleSuggestionsFetchRequested = async ({ value }) => {
        setSuggestions(await getSuggestions(value))
    }
    const handleSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    const getSectionSuggestions = section => section.details
    const getSuggestionValue = suggestion => suggestion.name

    const [value, setValue] = useState('')
    const handleValueChange = (event, { newValue }) => {
        setValue(newValue)
    }

    const inputProps = {
        value,
        onChange: handleValueChange,
        placeholder: '搜索音乐...',
    }

    const renderSuggestion = (suggestion, { isHighlighted }) => {
        const artists =
            prop('artists', suggestion) || prop('artist', suggestion)
        const inner = artists
            ? `${suggestion.name}-${joinArtistNames(artists)}`
            : suggestion.name
        return (
            <MenuItem component="div" selected={isHighlighted}>
                {inner}
            </MenuItem>
        )
    }
    const renderSectionTitle = section => {
        const keyTable = {
            artists: '歌手',
            songs: '歌曲',
            albums: '专辑',
            playlists: '歌单',
        }
        return <span>{keyTable[section.title]}</span>
    }
    const renderInputComponent = inputProps => (
        <TextField InputProps={inputProps} />
    )

    return (
        <Autosuggest
            multiSection={true}
            suggestions={suggestions}
            getSectionSuggestions={getSectionSuggestions}
            getSuggestionValue={getSuggestionValue}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            inputProps={inputProps}
            renderSuggestion={renderSuggestion}
            renderSectionTitle={renderSectionTitle}
            renderInputComponent={renderInputComponent}
        />
    )
}

SearchBar.propTypes = {}

export default SearchBar

async function getSuggestions(value) {
    const newValue = value.trim()
    if (isEmpty(newValue)) {
        return []
    }
    const suggestions = await fetchSuggestion(newValue)
    return suggestions
}
async function fetchSuggestion(keywords) {
    const { result } = await fetch('/search/suggest', { keywords })
    if (isEmpty(result)) {
        return {}
    } else {
        const { order } = result

        const isMvs = key => key !== 'mvs'
        const propList = order.filter(isMvs)
        const pickByProp = value =>
            value.map(pick(['id', 'name', 'artist', 'artists']))
        const toObject = value => ({
            title: value[0],
            details: value[1],
        })

        return pipe(
            pick(propList),
            map(pickByProp),
            toPairs,
            map(toObject)
        )(result)
    }
}
function joinArtistNames(artists = []) {
    if (artists.length === 1) {
        return artists[0].name
    }
    const artistNames = artists.map(artist => artist.name)
    return artistNames.join(' & ')
}
