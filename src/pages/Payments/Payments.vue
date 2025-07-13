<template>
  <br />

  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>
  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <!-- Header Row with Title and Button on Right -->
      <div class="row items-center justify-between">
        <div class="text-h6">Lead</div>
        <q-btn color="primary text-capitalize" label="Add Payment" icon="playlist_add" @click="PaymentsAdd" />
      </div>
      <!-- Subtitle -->
      <div class="text-subtitle2">Lead Management</div>
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

      const PaymentsAdd = () => {
        router.push('/PaymentsAdd') // This route must be defined in your router
      }

      const selected = ref([])
      const date = ref('2019/02/01')
      const model = ref(null)

      const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']

      const columns = [
        {
          name: 'Client',
          required: true,
          label: 'Client',
          align: 'left',
          field: row => row.Client,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'Invoice', align: 'left', label: 'Invoice', field: 'Invoice', sortable: true },
        { name: 'Payment_From', align: 'left', label: 'Payment From', field: 'Payment_From', sortable: true },
        { name: 'Payment_Ref_No', align: 'left', label: 'Payment Ref No', field: 'Payment_Ref_No', sortable: true },
        { name: 'Payment_Receipt', align: 'left', label: 'Payment Receipt', field: 'Payment_Receipt', sortable: true },
        { name: 'Received_Amount', align: 'left', label: 'Received Amount', field: 'Received_Amount', sortable: true },
        { name: 'TDS', align: 'left', label: 'TDS', field: 'TDS', sortable: true },
        { name: 'TDS_on_GST', align: 'left', label: 'TDS on GST', field: 'TDS_on_GST', sortable: true },
        { name: 'Invoice_Amount', align: 'left', label: 'Invoice Amount', field: 'Invoice_Amount', sortable: true },
        { name: 'Comments', align: 'left', label: 'Comments', field: 'Comments' },
        { name: 'Actions', align: 'left', label: 'Actions', field: 'Actions' }
      ]

      const rows = Array(120).fill().map(() => ({
        Client: 'Acme Corp',
        Invoice: 'INV-2025-001',
        Payment_From: '2025-07-01',
        Payment_Ref_No: 'PAY123456',
        Payment_Receipt: 'Receipt#567',
        Received_Amount: '₹10,000',
        TDS: '₹1,000',
        TDS_on_GST: '₹180',
        Invoice_Amount: '₹11,180',
        Comments: 'Payment received in full'
      }))

      return {
        PaymentsAdd,
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
