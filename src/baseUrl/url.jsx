import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://ventum-internship-backend.bis-apps.com/api',
    validateStatus: () => true,
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`

    return config
})

export default instance