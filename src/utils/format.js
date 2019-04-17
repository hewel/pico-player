import { curry } from 'ramda'

const formatAudioTime = curry((formatUnits, time) => {
    if (Number.isNaN(time)) {
        return '00:00'
    }
    let [hour, minute, second] = [
        formatUnits(Math.floor(time / 3600)),
        formatUnits(
            time < 3600 ? Math.floor(time / 60) : Math.floor((time % 3600) / 60)
        ),
        formatUnits(Math.floor(time % 60)),
    ]
    return time < 3600 ? `${minute}:${second}` : `${hour}:${minute}:${second}`
})

function formatUnits(num) {
    return num < 10 ? `0${num}` : `${num}`
}
export default formatAudioTime(formatUnits)
