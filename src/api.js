import axios from 'axios'

console.log(process.env.REACT_APP_URL_API)

const api = axios.create({
  contentType: 'application/json',
  baseURL: process.env.REACT_APP_URL_API ?? "https://api-showmebus.herokuapp.com"
})

export default api