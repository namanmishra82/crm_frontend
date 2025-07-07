<template>
  <br />

  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>
  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <!-- Header Row with Title and Button on Right -->
      <div class="row items-center justify-between">
        <div class="text-h6">Non Commercial</div>
        <q-btn color="primary text-capitalize" label="Add Bill" icon="playlist_add" @click="NonCommercialBAdd" />
      </div>
      <!-- Subtitle -->
      <div class="text-subtitle2">Non Commercial Management</div>
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
            <q-btn outline
                   icon-right="cancel"
                   label="Clear All"
                   class="text-capitalize q-pa-s"
                   @click="model = []" />
          </div>

          <!-- ❌ Clear All Button -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-1 text-right m-auto">
            <q-select dense outlined
                      v-model="model"
                      :options="options"
                      label="Sort By"
                      dropdown-icon="expand_more" />
          </div>

        </div>


        <!--   Data Table -->
        <div class="col-12 q-pt-md">
          <q-table class="my-sticky-header-table"
                   style="max-height: 400px;"
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
                   :rows-per-page-options="[0]"
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

      const NonCommercialBAdd = () => {
        router.push('/NonCommercialBAdd') // This route must be defined in your router
      }

      const selected = ref([])
      const date = ref('2019/02/01')
      const model = ref(null)

      const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']

      const columns = [
        { name: 'Client', required: true, label: 'Client', align: 'left', field: row => row.Client, format: val => `${val}`, sortable: true },
        { name: 'SMS_Id', align: 'left', label: 'SMS Id', field: 'SMS_Id', sortable: true },
        { name: 'Effective_From', align: 'left', label: 'Effective_From', field: 'Effective_From', sortable: true },
        { name: 'Change_Client_Name', align: 'left', label: 'Change_Client_Name', field: 'Change_Client_Name', sortable: true },
        { name: 'New_client_name', align: 'left', label: 'New_client_name', field: 'New_client_name', sortable: true },
        { name: 'Change_Billing_Address', align: 'left', label: 'Change_Billing_Address', field: 'Change_Billing_Address', sortable: true },
        { name: 'Address_selection', align: 'left', label: 'Address_selection', field: 'Address_selection', sortable: true },
        { name: 'Comments', align: 'left', label: 'Comments', field: 'Comments', sortable: true },
        { name: 'Documents', align: 'left', label: 'Documents', field: 'Documents' },
        { name: 'Actions', align: 'left', label: 'Actions', field: 'Actions' }
      ]

      const rows = Array(12).fill().map(() => ({
        Client: 'Acme Corp',
        SMS_Id: 'SMS123',
        Effective_From: '2025-07-01',
        Change_Client_Name: 'John Mehows',
        New_client_name: 'Stiv Rojar',
        Change_Billing_Address: '123 Corporate Ave, Mumbai',
        Address_selection: '123 Corporate Ave, Mumbai',
        Comments: 'Quarterly billing for services',
        Documents: 'yes'
      }))


      return {
        NonCommercialBAdd,
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
