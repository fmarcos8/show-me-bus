import axios from 'axios'

const api = axios.create({
  contentType: 'application/json',
  baseURL: "http://127.0.0.1:3001"
})

export default api