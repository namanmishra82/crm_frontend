<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-lg" style="width: 400px;">
          <q-card-section class="text-center">
            <div class="text-h4 text-primary q-mb-md">CRM Login</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="onSubmit" class="q-gutter-md">
              <q-input
                v-model="username"
                label="Username"
                outlined
                :rules="[val => !!val || 'Username is required']"
              />
              
              <q-input
                v-model="password"
                label="Password"
                type="password"
                outlined
                :rules="[val => !!val || 'Password is required']"
              />

              <div v-if="errorMessage" class="text-negative q-mb-md">
                {{ errorMessage }}
              </div>

              <q-btn
                type="submit"
                label="Login"
                color="primary"
                class="full-width"
                :loading="loading"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiService from '../services/apiService.js'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    
    const username = ref('')
    const password = ref('')
    const loading = ref(false)
    const errorMessage = ref('')

    // Generate device ID
    const generateDeviceId = () => {
      return 'web_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
    }

    const onSubmit = async () => {
      loading.value = true
      errorMessage.value = ''
      
      try {
        const deviceId = generateDeviceId()
        const credentials = {
          username: username.value,
          password: password.value
        }
        
        const response = await apiService.login(credentials, deviceId)
        
        if (response.token) {
          sessionStorage.setItem('token', response.token)
          sessionStorage.setItem('user', JSON.stringify(response.user))
          sessionStorage.setItem('device_id', deviceId)
          
          console.log('Login successful')
          router.push('/app/dashboard')
        }
        
      } catch (error) {
        errorMessage.value = 'Invalid Username/Password'
        console.error('Login failed:', error.response?.data?.message || error.message)
      } finally {
        loading.value = false
      }
    }

    return {
      username,
      password,
      loading,
      errorMessage,
      onSubmit
    }
  }
}
</script>