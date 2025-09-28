// Environment-based server configuration
const SERVER_URL = process.env.VUE_APP_SERVER_URL || 'http://localhost:3000'

// API Configuration
const API_CONFIG = {
  SERVER_URL: SERVER_URL,
  BASE_URL: `${SERVER_URL}/api`,
  AUTH_URL: `${SERVER_URL}/auth`,
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },

  // Accounts/Clients
  ACCOUNTS: {
    LIST: '/accounts',
    CREATE: '/accounts',
    UPDATE: '/accounts/:id',
    DELETE: '/accounts/:id',
    VIEW: '/accounts/:id'
  },

  // Leads
  LEADS: {
    LIST: '/leads',
    CREATE: '/leads',
    UPDATE: '/leads/:id',
    DELETE: '/leads/:id',
    VIEW: '/leads/:id'
  },

  // Opportunities
  OPPORTUNITIES: {
    LIST: '/opportunities',
    CREATE: '/opportunities',
    UPDATE: '/opportunities/:id',
    DELETE: '/opportunities/:id',
    VIEW: '/opportunities/:id'
  },

  // Start Bill
  START_BILL: {
    LIST: '/start-bill',
    CREATE: '/start-bill',
    UPDATE: '/start-bill/:id',
    DELETE: '/start-bill/:id',
    VIEW: '/start-bill/:id',
    GENERATE: '/start-bill/:id/generate'
  },

  // Stop Bill
  STOP_BILL: {
    LIST: '/stop-bill',
    CREATE: '/stop-bill',
    UPDATE: '/stop-bill/:id',
    DELETE: '/stop-bill/:id',
    VIEW: '/stop-bill/:id'
  },

  // Change Bill
  CHANGE_BILL: {
    COMMERCIAL: {
      LIST: '/change-bill/commercial',
      CREATE: '/change-bill/commercial',
      UPDATE: '/change-bill/commercial/:id',
      DELETE: '/change-bill/commercial/:id',
      VIEW: '/change-bill/commercial/:id'
    },
    NON_COMMERCIAL: {
      LIST: '/change-bill/non-commercial',
      CREATE: '/change-bill/non-commercial',
      UPDATE: '/change-bill/non-commercial/:id',
      DELETE: '/change-bill/non-commercial/:id',
      VIEW: '/change-bill/non-commercial/:id'
    }
  }
}

export default API_CONFIG