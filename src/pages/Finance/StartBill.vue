<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>
  
  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Start Bill Invoice</div>
      </div>
      <div class="text-subtitle2">Start Bill Invoice Management</div>
    </q-card-section>
    <q-separator dark inset />

    <q-card-section class="q-px-none">
      <div class="q-pa-md" style="height:auto;">
        <div class="row q-col-gutter-md items-center">
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

          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-select dense outlined v-model="statusFilter" :options="statusOptions" label="Select Status" />
          </div>
          
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-btn outline icon-right="cancel" label="Clear All" class="text-capitalize q-pa-s" @click="clearFilters" />
          </div>
        </div>

        <div class="col-12 q-pt-md">
          <q-table 
            class="my-sticky-header-table responsive-table-wrapper"
            dense
            flat
            bordered
            :rows="rows"
            :columns="columns"
            row-key="id"
            :loading="loading"
            :pagination="pagination">
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="text-center">
                <q-btn dense flat size="10px" icon="edit" @click="updateRow(props.row)" />
                <q-btn dense flat size="10px" icon="play_arrow" @click="generateRow(props.row)" />
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { useRouter } from 'vue-router'
import apiService from '../services/apiService.js'

export default {
  name: 'StartBillPage',
  setup() {
    const router = useRouter()

    const updateRow = (row) => {
      router.push(`/StartBillUpdate/${row.id}`)
    }

    const generateRow = async (row) => {
      try {
        await apiService.generateStartBill(row.id)
        console.log('Invoice generated for:', row)
      } catch (error) {
        console.error('Error generating invoice:', error)
      }
    }

    return {
      updateRow,
      generateRow
    }
  },
  data() {
    return {
      date: '',
      statusFilter: null,
      loading: false,
      statusOptions: ['Pending', 'Generated', 'Completed'],
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        { name: 'account', label: 'Account', field: 'account', align: 'left', sortable: true },
        { name: 'subscription_form_no', label: 'Subscription Form No', field: 'subscription_form_no', align: 'left', sortable: true },
        { name: 'start_date', label: 'Start Date', field: 'start_date', align: 'left', sortable: true },
        { name: 'billing_currency', label: 'Billing Currency', field: 'billing_currency', align: 'left', sortable: true },
        { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
      ],
      rows: []
    }
  },
  async mounted() {
    await this.loadStartBills()
  },
  methods: {
    async loadStartBills() {
      try {
        this.loading = true
        this.rows = await apiService.getStartBills()
      } catch (error) {
        console.error('Error loading start bills:', error)
      } finally {
        this.loading = false
      }
    },
    clearFilters() {
      this.date = ''
      this.statusFilter = null
    }
  }
}
</script>