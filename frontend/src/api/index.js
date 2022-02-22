import axios from 'axios'

const API = axios.create({
    baseURL: 'https://voice-memo-mern.herokuapp.com/'
})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchSpeeches = () => API.get('/speech')
export const createSpeech = (newSpeech) => API.post('/speech', newSpeech)
export const editSpeech = (id, newSpeech) => API.patch(`/speech/${id}`, newSpeech )
export const deleteSpeech = (id) => API.delete(`/speech/${id}`)

export const fetchSpeech = (id) => API.get(`/speech/${id}`)

export const signin = (formData) => API.post('/user/signin', formData)
export const signup = (formData) => API.post('/user/signup', formData)

export const authTest = (data) => {
    console.log(data);
    return API.post('/speech/test', { data })
}
