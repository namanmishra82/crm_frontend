import axios from 'axios'
import API_CONFIG from '../config/api.js'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token')
    const deviceId = sessionStorage.getItem('device_id')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    if (deviceId) {
      config.headers['Device-ID'] = deviceId
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Generic API service class
class ApiService {
  // Common list handler - ensures array response and error handling
  async handleListAPI(apiCall) {
    try {
      const response = await apiCall()
      // Ensure response is always an array
      if (Array.isArray(response)) {
        return response
      } else if (response && Array.isArray(response.data)) {
        return response.data
      } else {
        console.warn('API response is not an array:', response)
        return []
      }
    } catch (error) {
      console.error('List API error:', error)
      return []
    }
  }

  // Generic module-based API call
  async callAPI(module, action, data = null, id = null) {
    const config = {
      headers: {
        'Module': module,
        'Action': action
      }
    }
    
    let url = API_CONFIG.BASE_URL
    if (id) url += `/${id}`
    
    if (action === 'list' || action === 'view') {
      const response = await apiClient.get(url, config)
      return response.data
    } else {
      const response = await apiClient.post(url, data, config)
      return response.data
    }
  }

  // Authentication methods
  async login(credentials, deviceId) {
    // Use centralized auth URL with device_id in headers
    const response = await axios.post(`${API_CONFIG.AUTH_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
        'Device-ID': deviceId
      }
    })
    return response.data
  }

  async logout() {
    return this.callAPI('auth', 'logout')
  }

  // Users module methods
  async getUsers() {
    return this.handleListAPI(() => this.callAPI('users', 'list'))
  }

  async addUser(userData) {
    return this.callAPI('users', 'add', userData)
  }

  async updateUser(id, userData) {
    return this.callAPI('users', 'update', userData, id)
  }

  async deleteUser(id) {
    return this.callAPI('users', 'delete', null, id)
  }

  async getUser(id) {
    return this.callAPI('users', 'view', null, id)
  }

  // Common list methods for other modules
  async getAccounts() {
    return this.handleListAPI(() => this.callAPI('accounts', 'list'))
  }

  async getLeads() {
    return this.handleListAPI(() => this.callAPI('leads', 'list'))
  }

  async getOpportunities() {
    return this.handleListAPI(() => this.callAPI('opportunities', 'list'))
  }

  async getStartBills() {
    return this.handleListAPI(() => this.callAPI('start_bill', 'list'))
  }

  async getStopBills() {
    return this.handleListAPI(() => this.callAPI('stop_bill', 'list'))
  }

  async getCommercialBills() {
    return this.handleListAPI(() => this.callAPI('commercial_bill', 'list'))
  }

  async getNonCommercialBills() {
    return this.handleListAPI(() => this.callAPI('non_commercial_bill', 'list'))
  }
}

export default new ApiService()