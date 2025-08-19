<template>
  <br />

  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>
  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <!-- Header Row with Title and Button on Right -->
      <div class="row items-center justify-between">
        <div class="text-h6">User Groups</div>
        <q-btn color="primary text-capitalize" label="Add User Group" icon="playlist_add" @click="userGroupAdd" />
      </div>
      <!-- Subtitle -->
      <div class="text-subtitle2">User Group Management</div>
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
                      label="Select Permission Level"
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
                           @click="userGroupEdit" title="edit" />
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
    name: 'UserGroupsPage',
    setup() {
      const router = useRouter()

      const userGroupAdd = () => {
        router.push('/UserGroupAdd')
      }
      const userGroupEdit = () => {
        router.push('/UserGroupEdit')
      }

      const selected = ref([])
      const date = ref('2019/02/01')
      const model = ref(null)

      const options = ['Active', 'Inactive', 'Pending', 'Suspended']

      const columns = [
        {
          name: 'name',
          required: true,
          label: 'Group Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'Status', align: 'left', label: 'Status', field: 'Status', sortable: true },
        { name: 'Permission_Level', align: 'left', label: 'Permission Level', field: 'Permission_Level', sortable: true },
        { name: 'Date_created', align: 'left', label: 'Date Created', field: 'Date_created' },
        { name: 'Created_By', align: 'left', label: 'Created By', field: 'Created_By', sortable: true },
        { name: 'User_Count', align: 'left', label: 'User Count', field: 'User_Count', sortable: true },
        { name: 'Actions', align: 'left', label: 'Actions', field: 'Actions' }
      ]

      const rows = Array(50).fill().map(() => ({
        name: 'Admin Group',
        Status: 'Active',
        Permission_Level: 'Full Access',
        Date_created: '2025-05-26',
        Created_By: 'System Admin',
        User_Count: '5'
      }))

      return {
        userGroupAdd,
        userGroupEdit,
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