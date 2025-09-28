<template>
  <br />

  <router-link to="/app/Users" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Users
  </router-link>
  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <!-- Header Row with Title and Button on Right -->
      <div class="row items-center justify-between">
        <div class="text-h6">Add User</div>
        <q-btn color="primary text-capitalize" label="Save User" icon="save" @click="saveUser" />
      </div>
      <!-- Subtitle -->
      <div class="text-subtitle2">Create New User</div>
    </q-card-section>
    <q-separator dark inset />

    <q-card-section class="q-px-none">
      <!-- User Form -->
      <div class="q-pa-md">
        <q-form @submit.prevent="saveUser" class="q-gutter-md">
          <div class="row q-gutter-md">
            <q-input 
              v-model="form.employee_id" 
              label="Employee ID" 
              outlined
              class="col" 
              :rules="[val => !!val || 'Employee ID is required']"
            />
            <q-input 
              v-model="form.username" 
              label="Username" 
              outlined
              class="col"
              :rules="[val => !!val || 'Username is required']"
            />
          </div>
          
          <div class="row q-gutter-md">
            <q-input 
              v-model="form.first_name" 
              label="First Name" 
              outlined
              class="col"
              :rules="[val => !!val || 'First Name is required']"
            />
            <q-input 
              v-model="form.last_name" 
              label="Last Name" 
              outlined
              class="col"
              :rules="[val => !!val || 'Last Name is required']"
            />
          </div>
          
          <div class="row q-gutter-md">
            <q-input 
              v-model="form.email" 
              label="Email" 
              type="email" 
              outlined
              class="col"
              :rules="[val => !!val || 'Email is required']"
            />
            <q-input 
              v-model="form.mobile" 
              label="Mobile" 
              outlined
              class="col"
              :rules="[val => !!val || 'Mobile is required']"
            />
          </div>
          
          <div class="row q-gutter-md">
            <q-input 
              v-model="form.password" 
              label="Password" 
              type="password" 
              outlined
              class="col"
              :rules="[val => !!val || 'Password is required']"
            />
            <q-input 
              v-model="form.date_of_birth" 
              label="Date of Birth" 
              type="date" 
              outlined
              class="col"
            />
          </div>
          
          <div class="row q-gutter-md">
            <q-select 
              v-model="form.otp_type" 
              :options="otpOptions" 
              label="OTP Type" 
              outlined
              class="col"
            />
            <q-select 
              v-model="form.data_visibility" 
              :options="visibilityOptions" 
              label="Data Visibility" 
              outlined
              class="col"
            />
          </div>

          <div class="row q-gutter-md q-pt-md">
            <q-btn 
              type="submit" 
              color="primary" 
              label="Save User" 
              icon="save"
              :loading="loading"
            />
            <q-btn 
              color="grey" 
              label="Cancel" 
              icon="cancel"
              @click="$router.push('/app/Users')"
            />
          </div>
        </q-form>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiService from '../../../services/apiService'

export default {
  name: 'UserAddPage',
  setup() {
    const router = useRouter()
    const loading = ref(false)
    
    const form = ref({
      employee_id: '',
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      mobile: '',
      password: '',
      date_of_birth: '',
      otp_type: 'N',
      data_visibility: 'S'
    })

    const otpOptions = [
      { label: 'None', value: 'N' },
      { label: 'SMS', value: 'S' },
      { label: 'Email', value: 'E' },
      { label: 'Both', value: 'B' }
    ]

    const visibilityOptions = [
      { label: 'Self & Reporting', value: 'S' },
      { label: 'All', value: 'A' }
    ]

    const saveUser = async () => {
      try {
        loading.value = true
        await apiService.addUser(form.value)
        console.log('User saved successfully')
        router.push('/app/Users')
      } catch (error) {
        console.error('Error saving user:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      otpOptions,
      visibilityOptions,
      saveUser
    }
  }
}
</script>