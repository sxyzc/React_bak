import axios from 'axios'

axios.defaults.withCredentials = true 

// axios.defaults.baseURL = 'http://172.20.10.9:8080/blockchain/'
axios.defaults.baseURL = 'http://127.0.0.1:8080/blockchain/'
export default axios

// import ns from './http'
// const axios = ns.axios

//url写："paper/like/"