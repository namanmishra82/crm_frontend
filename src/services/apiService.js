import axios from 'axios'
import API_CONFIG, { API_ENDPOINTS } from '../config/api.js'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
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
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Generic API service class
class ApiService {
  // Authentication methods
  async login(credentials) {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
    return response.data
  }

  async logout() {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    return response.data
  }

  // Generic CRUD operations
  async list(endpoint) {
    const response = await apiClient.get(endpoint)
    return response.data
  }

  async create(endpoint, data) {
    const response = await apiClient.post(endpoint, data)
    return response.data
  }

  async view(endpoint, id) {
    const url = endpoint.replace(':id', id)
    const response = await apiClient.get(url)
    return response.data
  }

  async update(endpoint, id, data) {
    const url = endpoint.replace(':id', id)
    const response = await apiClient.put(url, data)
    return response.data
  }

  async delete(endpoint, id) {
    const url = endpoint.replace(':id', id)
    const response = await apiClient.delete(url)
    return response.data
  }

  // Start Bill
  async getStartBills() {
    return this.list(API_ENDPOINTS.START_BILL.LIST)
  }

  async createStartBill(data) {
    return this.create(API_ENDPOINTS.START_BILL.CREATE, data)
  }

  async getStartBill(id) {
    return this.view(API_ENDPOINTS.START_BILL.VIEW, id)
  }

  async updateStartBill(id, data) {
    return this.update(API_ENDPOINTS.START_BILL.UPDATE, id, data)
  }

  async deleteStartBill(id) {
    return this.delete(API_ENDPOINTS.START_BILL.DELETE, id)
  }

  async generateStartBill(id) {
    const url = API_ENDPOINTS.START_BILL.GENERATE.replace(':id', id)
    const response = await apiClient.post(url)
    return response.data
  }

  // Stop Bill
  async getStopBills() {
    return this.list(API_ENDPOINTS.STOP_BILL.LIST)
  }

  async createStopBill(data) {
    return this.create(API_ENDPOINTS.STOP_BILL.CREATE, data)
  }

  async updateStopBill(id, data) {
    return this.update(API_ENDPOINTS.STOP_BILL.UPDATE, id, data)
  }

  // Change Bill Commercial
  async getCommercialBills() {
    return this.list(API_ENDPOINTS.CHANGE_BILL.COMMERCIAL.LIST)
  }

  async createCommercialBill(data) {
    return this.create(API_ENDPOINTS.CHANGE_BILL.COMMERCIAL.CREATE, data)
  }

  async updateCommercialBill(id, data) {
    return this.update(API_ENDPOINTS.CHANGE_BILL.COMMERCIAL.UPDATE, id, data)
  }

  // Change Bill Non-Commercial
  async getNonCommercialBills() {
    return this.list(API_ENDPOINTS.CHANGE_BILL.NON_COMMERCIAL.LIST)
  }

  async createNonCommercialBill(data) {
    return this.create(API_ENDPOINTS.CHANGE_BILL.NON_COMMERCIAL.CREATE, data)
  }

  async updateNonCommercialBill(id, data) {
    return this.update(API_ENDPOINTS.CHANGE_BILL.NON_COMMERCIAL.UPDATE, id, data)
  }
}

export default new ApiService()