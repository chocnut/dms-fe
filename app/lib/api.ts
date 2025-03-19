import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL
console.log('API base URL:', baseURL)

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  response => {
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return { ...response, data: response.data }
    }
    return response
  },
  error => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)
