import axios from 'axios'
import musicApi from 'config/musicApi'

const fetch = (url, params) => {
    return axios({
        method: 'get',
        url: musicApi + url,
        params,
        xhrFields: {
            withCredentials: true
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.log(error)
        })
}

export default fetch
