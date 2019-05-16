export default function joinArtistNames(artists = []) {
    const length = artists.length
    if (length === 1) {
        return artists[0].name
    }
    return length
        ? artists.map(artist => artist.name).join(' & ')
        : artists.name
}
