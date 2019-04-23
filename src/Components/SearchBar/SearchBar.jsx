import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import Autosuggest from 'react-autosuggest'

import { css } from '@emotion/core'

import { isEmpty, pipe, map, toPairs, pick, prop } from 'ramda'

import fetch from 'utils/fetch'
import theme from './autosuggest.sass'

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
            ? `${suggestion.name} - ${joinArtistNames(artists) || ''}`
            : suggestion.name
        return (
            <ListItem component="div" selected={isHighlighted} dense button>
                {inner}
            </ListItem>
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
    const renderInputComponent = inputProps => {
        const { inputRef = () => {}, ref, ...props } = inputProps
        const InputProps = {
            inputRef: node => {
                ref(node)
                inputRef(node)
            },
        }
        return (
            <TextField
                InputProps={InputProps}
                {...props}
                css={css`
                    width: 736px;
                `}
            />
        )
    }
    // eslint-disable-next-line react/prop-types
    const renderSuggestionsContainer = ({ containerProps, children }) => (
        <Paper square {...containerProps}>
            {children}
        </Paper>
    )

    return (
        <Autosuggest
            multiSection
            suggestions={suggestions}
            getSectionSuggestions={getSectionSuggestions}
            getSuggestionValue={getSuggestionValue}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            renderSuggestion={renderSuggestion}
            renderSectionTitle={renderSectionTitle}
            renderInputComponent={renderInputComponent}
            renderSuggestionsContainer={renderSuggestionsContainer}
            inputProps={inputProps}
            theme={theme}
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
    const length = artists.length
    if (length === 1) {
        return artists[0].name
    }
    return length
        ? artists.map(artist => artist.name).join(' & ')
        : artists.name
}
