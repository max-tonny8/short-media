import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

axios.defaults.withCredentials = true
const options: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}
const service: AxiosInstance = axios.create(options)
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {}
)
service.interceptors.response.use((response) => {
  return response
})
export default service
