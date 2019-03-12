import axios from 'axios'

const fetch = (url, params) => {
    return axios({
        method: 'get',
        url,
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
