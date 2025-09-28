<template>
  <br />

  <router-link to="/app/dashboard" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>
  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <!-- Header Row with Title and Button on Right -->
      <div class="row items-center justify-between">
        <div class="text-h6">Users</div>
        <q-btn color="primary text-capitalize" label="Add User" icon="playlist_add" @click="userAdd" />
      </div>
      <!-- Subtitle -->
      <div class="text-subtitle2">Users Management</div>
    </q-card-section>
    <q-separator dark inset />

    <q-card-section class="q-px-none">
      <!-- page list table  -->
      <div class="q-pa-md" style="height:auto;">
        <!--   Data Table -->
        <div class="col-12 q-pt-md">
          <q-table class="my-sticky-header-table responsive-table-wrapper" 
                   dense
                   flat
                   bordered
                   :rows="users"
                   :columns="columns"
                   row-key="user_id"
                   :loading="loading"
                   virtual-scroll
                   :virtual-scroll-item-size="48"
                   :virtual-scroll-sticky-size-start="48"
                   :pagination="pagination">
            <template v-slot:body="props">
              <q-tr :props="props" :class="props.rowIndex % 2 === 0 ? 'even-row' : 'odd-row'">
                <q-td v-for="col in props.cols"
                      :key="col.name"
                      :props="props">
                  <template v-if="col.name === 'actions'">
                    <q-btn dense flat size="10px"
                           icon="edit"
                           @click="userEdit(props.row)" title="edit" />
                    <q-btn dense flat size="10px"
                           icon="delete"
                           @click="deleteUser(props.row)" title="delete" />
                    <q-btn dense flat size="10px"
                           icon="info"
                           @click="infoRow(props.row)" title="info" />
                  </template>
                  <template v-else>
                    {{ col.value }}
                  </template>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import apiService from '../../../services/apiService'

export default {
  name: 'UsersPage',
  setup() {
    const router = useRouter()
    const users = ref([])
    const loading = ref(false)
    
    const pagination = ref({ rowsPerPage: 10 })
    
    const columns = [
      { name: 'employee_id', label: 'Employee ID', field: 'employee_id', align: 'left' },
      { name: 'username', label: 'Username', field: 'username', align: 'left' },
      { name: 'first_name', label: 'First Name', field: 'first_name', align: 'left' },
      { name: 'last_name', label: 'Last Name', field: 'last_name', align: 'left' },
      { name: 'email', label: 'Email', field: 'email', align: 'left' },
      { name: 'mobile', label: 'Mobile', field: 'mobile', align: 'left' },
      { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
    ]

    const loadUsers = async () => {
      loading.value = true
      users.value = await apiService.getUsers()
      loading.value = false
    }

    const userAdd = () => {
      router.push('/app/UserAdd')
    }

    const userEdit = (user) => {
      router.push('/app/UserEdit')
    }

    const deleteUser = async (user) => {
      try {
        await apiService.deleteUser(user.user_id)
        loadUsers()
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }

    const infoRow = (user) => {
      console.log('User info:', user)
    }

    onMounted(() => {
      loadUsers()
    })

    return {
      users,
      loading,
      pagination,
      columns,
      userAdd,
      userEdit,
      deleteUser,
      infoRow
    }
  }
}
</script>