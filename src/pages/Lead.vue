<template>
  <br />
  <a href="IndexPage.vue" target="_blank" rel="noopener" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </a>
  <q-card class="my-card q-ma-md col-auto ">
    <q-card-section class="q-pb-none ">
      <!-- Header Row with Title and Button on Right -->
      <div class="row items-center justify-between">
        <div class="text-h6">Lead</div>
        <q-btn color="primary text-capitalize" label="Add Lead" icon="playlist_add" @click="leadadd" />
      </div>
      <!-- Subtitle -->
      <div class="text-subtitle2">Lead Management</div>
    </q-card-section>
    <q-separator dark inset />

    <q-card-section class="q-px-none">
      <!-- page list table  -->
      <q-page class="q-pa-md" style="height:auto;">

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
                      label="Select an compaign"
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
            <q-select dense outlined
                      v-model="model"
                      :options="options"
                      label="Filter by"
                      dropdown-icon="expand_more" />
          </div>

          <!-- ❌ Clear All Button -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-2 text-right">
            <q-btn  outline color="dark"
                   icon-right="cancel"
                   label="Clear All"
                   class="text-capitalize q-pa-s"
                   @click="model = []" />
          </div>

        </div>


        <!--   Data Table -->
        <div class="col-12 q-pt-md">
          <q-table class="my-sticky-header-table "
                   flat
                   bordered
                   :rows="rows"
                   :columns="columns"
                   row-key="name"
                   :selected-rows-label="getSelectedString"
                   selection="multiple"
                   v-model:selected="selected" />

          <div class="q-mt-ms">
            Selected: {{ JSON.stringify(selected) }}
          </div>
        </div>

      </q-page>
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

      const leadadd = () => {
        router.push('/LeadAdd') // This route must be defined in your router
      }

      const selected = ref([])
      const date = ref('2019/02/01')
      const model = ref(null)

      const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']

      const columns = [
        {
          name: 'name',
          required: true,
          label: 'Lead Source',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'Status', align: 'left', label: 'Status', field: 'Status', sortable: true },
        { name: 'Assigned_To', align: 'left', label: 'Assigned To', field: 'Assigned_To', sortable: true },
        { name: 'Date created', align: 'left', label: 'Date created', field: 'Date_created' },
        { name: 'Lead Source Campaign', align: 'left', label: 'Lead Source Campaign', field: 'Lead_Source_Campaign', sortable: true },
        { name: 'Event Name', align: 'left', label: 'Event Name', field: 'Event_Name', sortable: true },
        { name: 'Event Date', align: 'left', label: 'Event Date', field: 'Event_Date', sortable: true },
        { name: 'Priority', align: 'left', label: 'Priority', field: 'Priority', sortable: true },
        { name: 'Actions', align: 'left', label: 'Actions', field: 'Actions' }
      ]

      const rows = Array(12).fill().map(() => ({
        name: 'Website',
        Status: 'Active',
        Assigned_To: 'JhoneMaslor',
        Date_created: '2025-05-26',
        Lead_Source_Campaign: 'No Data showing',
        Event_Name: 'Quick process',
        Event_Date: '2025-05-26',
        Priority: 'Medium'
      }))

      return {
        leadadd,
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
