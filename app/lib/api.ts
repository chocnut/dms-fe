import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
console.log('API base URL:', baseURL)

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add response interceptor to handle API response structure
api.interceptors.response.use(
  response => {
    // If the response has a data.data structure, return the nested data
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
