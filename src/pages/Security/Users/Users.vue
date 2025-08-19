<template>
  <br />

  <router-link to="/" class="text-primary q-ma-lg">
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
      <div class="text-subtitle2">User Management</div>
    </q-card-section>
    <q-separator dark inset />

    <q-card-section class="q-px-none">
      <!-- page list table  -->
      <div class="q-pa-md" style="height:auto;">

        <div class="row q-col-gutter-md items-center">

          <!--   Date Picker -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Select Date" :hide-bottom-space="true">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <!--   4 Select Filters -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-select dense outlined
                      v-model="model"
                      :options="options"
                      label="Select a Status"
                      dropdown-icon="expand_more" />
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-select dense outlined
                      v-model="model"
                      :options="options"
                      label="Select User Group"
                      dropdown-icon="expand_more" />
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-select dense outlined
                      v-model="model"
                      :options="options"
                      label="Select Role"
                      dropdown-icon="expand_more" />
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-btn outline
                   icon-right="cancel"
                   label="Clear All"
                   class="text-capitalize q-pa-s"
                   @click="model = []" />
          </div>

          <!-- ❌ Clear All Button -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-select dense outlined
                      v-model="model"
                      :options="options"
                      label="Sort By"
                      dropdown-icon="expand_more" />
          </div>

        </div>


        <!--   Data Table -->
        <div class="col-12 q-pt-md">
          <q-table class="my-sticky-header-table responsive-table-wrapper" 
                   dense
                   flat
                   bordered
                   :rows="rows"
                   :columns="columns"
                   row-key="name"
                   :loading="loading"
                   virtual-scroll
                   :virtual-scroll-item-size="48"
                   :virtual-scroll-sticky-size-start="48"
                   :pagination="pagination"
                   
                   @virtual-scroll="onScroll">
            <template v-slot:body="props">
              <q-tr :props="props" :class="props.rowIndex % 2 === 0 ? 'even-row' : 'odd-row'">
                <q-td v-for="col in props.cols"
                      :key="col.name"
                      :props="props">
                  <template v-if="col.name === 'Actions'">
                    <q-btn dense flat size="10px"
                           icon="edit"
                           @click="userEdit" title="edit" />
                    <q-btn dense flat size="10px"
                           icon="delete"
                           @click="deleteRow(props.row)" />
                    <q-btn dense flat size="10px"
                           icon="info"
                           @click="infoRow(props.row)" />
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
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  export default {
    name: 'UsersPage',
    setup() {
      const router = useRouter()

      const userAdd = () => {
        router.push('/UserAdd')
      }
      const userEdit = () => {
        router.push('/UserEdit')
      }

      const selected = ref([])
      const date = ref('2019/02/01')
      const model = ref(null)

      const options = ['Active', 'Inactive', 'Pending', 'Suspended']

      const columns = [
        {
          name: 'name',
          required: true,
          label: 'Full Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'Username', align: 'left', label: 'Username', field: 'Username', sortable: true },
        { name: 'Email', align: 'left', label: 'Email', field: 'Email', sortable: true },
        { name: 'User_Group', align: 'left', label: 'User Group', field: 'User_Group', sortable: true },
        { name: 'Role', align: 'left', label: 'Role', field: 'Role', sortable: true },
        { name: 'Status', align: 'left', label: 'Status', field: 'Status', sortable: true },
        { name: 'Last_Login', align: 'left', label: 'Last Login', field: 'Last_Login' },
        { name: 'Actions', align: 'left', label: 'Actions', field: 'Actions' }
      ]

      const rows = Array(50).fill().map(() => ({
        name: 'John Doe',
        Username: 'john.doe',
        Email: 'john.doe@company.com',
        User_Group: 'Admin Group',
        Role: 'Administrator',
        Status: 'Active',
        Last_Login: '2025-05-26 10:30'
      }))

      return {
        userAdd,
        userEdit,
        selected,
        columns,
        rows,
        date,
        model,
        options
      }
    }
  }
</script>