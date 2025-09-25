<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-lg" style="width: 400px;">
          <q-card-section class="text-center">
            <div class="text-h4 text-primary q-mb-md">CRM Login</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="onSubmit" class="q-gutter-md">
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
import { useQuasar } from 'quasar'
import apiService from '../services/apiService'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const $q = useQuasar()
    
    const username = ref('')
    const password = ref('')
    const loading = ref(false)

    const onSubmit = async () => {
      loading.value = true
      
      try {
        const response = await apiService.login({
          username: username.value,
          password: password.value
        })
        
        // Store token in localStorage
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        
        $q.notify({
          type: 'positive',
          message: 'Login successful'
        })
        
        // Redirect to dashboard
        router.push('/dashboard')
        
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Login failed'
        })
      } finally {
        loading.value = false
      }
    }

    return {
      username,
      password,
      loading,
      onSubmit
    }
  }
}
</script>