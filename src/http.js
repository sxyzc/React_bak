import axios from 'axios'

axios.defaults.withCredentials = true 

axios.defaults.baseURL = 'http://192.168.20.15:8080/blockchain/'

export default axios
