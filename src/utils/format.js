import { curry } from 'ramda'

const formatAudioTime = curry((formatUnits, time) => {
    if (Number.isNaN(time)) {
        return '00:00'
    }
    let [hour, minute, second] = [
        formatUnits(parseInt(time / 3600)),
        formatUnits(time < 3600 ? parseInt(time / 60) : parseInt(time % 3600 / 60)),
        formatUnits(parseInt(time % 60))
    ]
    return time < 3600 ? `${minute}:${second}` : `${hour}:${minute}:${second}`
})

function formatUnits(num) {
    return num < 10 ? `0${num}` : `${num}`
}
export default formatAudioTime(formatUnits)
