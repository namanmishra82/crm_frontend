<template>
  <br />

  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>
  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <!-- Header Row with Title and Button on Right -->
      <div class="row items-center justify-between">
        <div class="text-h6">Activity Log</div>
        <q-btn color="primary text-capitalize" label="Add" icon="playlist_add" @click="Action_Logadd" />
      </div>
      <!-- Subtitle -->
      <div class="text-subtitle2">Activity Management</div>
    </q-card-section>
    <q-separator dark inset />

    <q-card-section class="q-px-none">
      <!-- page list table  -->
      <div class="q-pa-md" style="height:auto;">

        <div class="row q-col-gutter-md items-center">

          <!--   Date Picker -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Follow Upon Date" :hide-bottom-space="true">
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
                      label="Select Activity Type"
                      dropdown-icon="expand_more" />
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-select dense outlined
                      v-model="model"
                      :options="options"
                      label="Select Task Name"
                      dropdown-icon="expand_more" />
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-select dense outlined
                      v-model="model"
                      :options="options"
                      label="Priority"
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
                           @click="editRow(props.row)" />
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
    name: 'AboutPage',
    setup() {
      const router = useRouter()

      const Action_Logadd = () => {
        router.push('/Action_LogAdd') // This route must be defined in your router
      }

      const selected = ref([])
      const date = ref('2019/02/01')
      const model = ref(null)

      const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']

      const columns = [
        { name: 'reported_by', label: 'Reported By', align: 'left', field: 'reported_by', sortable: true },
        { name: 'activity_type', label: 'Activity Type', align: 'left', field: 'activity_type', sortable: true },
        { name: 'task_name', label: 'Task Name', align: 'left', field: 'task_name', sortable: true },
        { name: 'location', label: 'Location', align: 'left', field: 'location', sortable: true },
        { name: 'activity_date_time', label: 'Activity Date Time', align: 'left', field: 'activity_date_time', sortable: true },
        { name: 'duration', label: 'Duration', align: 'left', field: 'duration', sortable: true },
        { name: 'search_user', label: 'Search User', align: 'left', field: 'search_user', sortable: true },
        { name: 'client_name', label: 'Client Name', align: 'left', field: 'client_name', sortable: true },
        { name: 'remarks', label: 'Remarks', align: 'left', field: 'remarks', sortable: true },
        { name: 'next_activity', label: 'Next Activity', align: 'left', field: 'next_activity', sortable: true },
        { name: 'follow_up_on', label: 'Follow up Activity On', align: 'left', field: 'follow_up_on', sortable: true },
        { name: 'follow_up_type', label: 'Follow up activity Type', align: 'left', field: 'follow_up_type', sortable: true },
        { name: 'upload_docs', label: 'Upload documents', align: 'left', field: 'upload_docs', sortable: true },
        { name: 'Actions', align: 'left', label: 'Actions', field: 'Actions' }
      ]

      
      const rows = Array(120).fill().map((_, i) => ({
        reported_by: 'User ' + (i + 1),
        activity_type: 'Call',
        task_name: 'Follow up',
        location: 'Mumbai',
        activity_date_time: '2025-07-18 10:00 AM',
        duration: '30 mins',
        search_user: 'SearchUser' + (i + 1),
        client_name: 'Client ' + (i + 1),
        remarks: 'Initial contact made',
        next_activity: 'Send proposal',
        follow_up_on: '2025-07-20',
        follow_up_type: 'Email',
        upload_docs: 'Proposal.pdf'
      }))

      return {
        Action_Logadd,
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
