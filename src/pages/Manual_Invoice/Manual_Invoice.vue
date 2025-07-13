<template>
  <br />

  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>
  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <!-- Header Row with Title and Button on Right -->
      <div class="row items-center justify-between">
        <div class="text-h6">Invoice List </div>
        <q-btn color="primary text-capitalize" label="Add Invoice" icon="playlist_add" @click="InvoiceAdd" />
      </div>
      <!-- Subtitle -->
      <div class="text-subtitle2">Invoice Management</div>
    </q-card-section>
    <q-separator dark inset />

    <q-card-section class="q-px-none">
      <!-- page list table  -->
      <div class="q-pa-md" style="height:auto;">

        <div class="row q-col-gutter-md items-center">

          <!--   Date Picker -->
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Select Invoice Date" :hide-bottom-space="true">
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
                      label="Select a Document"
                      dropdown-icon="expand_more" />
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-select dense outlined
                      v-model="model"
                      :options="options"
                      label="Select a Month"
                      dropdown-icon="expand_more" />
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
            <q-select dense outlined
                      v-model="model"
                      :options="options"
                      label="Select Currency"
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

      const InvoiceAdd = () => {
          router.push('/InvoiceAdd') // This route must be defined in your router
      }

      const selected = ref([])
      const date = ref('2019/02/01')
      const model = ref(null)

      const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']

      const columns = [
        { name: 'Client', required: true, label: 'Client', align: 'left', field: row => row.Client, format: val => `${val}`, sortable: true },
        { name: 'Document_Type', align: 'left', label: 'Document Type', field: 'Document_Type', sortable: true },
        { name: 'Ref_Invoice', align: 'left', label: 'Ref Invoice', field: 'Ref_Invoice', sortable: true },
        { name: 'Invoice_From', align: 'left', label: 'Invoice From', field: 'Invoice_From', sortable: true },
        { name: 'Invoice_Till', align: 'left', label: 'Invoice Till', field: 'Invoice_Till', sortable: true },
        { name: 'No_Of_Months', align: 'left', label: 'No Of Months', field: 'No_Of_Months', sortable: true },
        { name: 'Billing_Address', align: 'left', label: 'Billing Address', field: 'Billing_Address', sortable: true },
        { name: 'Tax_Applicable', align: 'left', label: 'Tax Applicable', field: 'Tax_Applicable', sortable: true },
        { name: 'Billing_Currency', align: 'left', label: 'Billing Currency', field: 'Billing_Currency', sortable: true },
        { name: 'Billing_Period', align: 'left', label: 'Billing Period', field: 'Billing_Period', sortable: true },
        { name: 'Currency_Selling_Rate', align: 'left', label: 'Currency Selling Rate', field: 'Currency_Selling_Rate', sortable: true },
        { name: 'Complimentary_Applicable', align: 'left', label: 'Complimentary Applicable', field: 'Complimentary_Applicable', sortable: true },
        { name: 'Complimentary_From', align: 'left', label: 'Complimentary From', field: 'Complimentary_From', sortable: true },
        { name: 'Complimentary_Months', align: 'left', label: 'Complimentary Months', field: 'Complimentary_Months', sortable: true },
        { name: 'Ledger_Name', align: 'left', label: 'Ledger Name', field: 'Ledger_Name', sortable: true },
        { name: 'Total_Amount', align: 'left', label: 'Total Amount', field: 'Total_Amount', sortable: true },
        { name: 'Tax', align: 'left', label: 'Tax', field: 'Tax', sortable: true },
        { name: 'Grand_Total', align: 'left', label: 'Grand Total', field: 'Grand_Total', sortable: true },
        { name: 'Comments', align: 'left', label: 'Comments', field: 'Comments', sortable: true },
        { name: 'Security_Deposit', align: 'left', label: 'Security Deposit', field: 'Security_Deposit', sortable: true },
        { name: 'Actions', align: 'left', label: 'Actions', field: 'Actions' }
      ]


      const rows = Array(120).fill().map(() => ({
        Client: 'Acme Corp',
        Document_Type: 'Invoice',
        Ref_Invoice: 'INV-2025-001',
        Invoice_From: '2025-01-01',
        Invoice_Till: '2025-03-31',
        No_Of_Months: 3,
        Billing_Address: '123 Corporate Ave, Mumbai',
        Tax_Applicable: '18%',
        Billing_Currency: 'INR',
        Billing_Period: 'Q1 2025',
        Currency_Selling_Rate: '1.00',
        Complimentary_Applicable: 'No',
        Complimentary_From: '2345',
        Complimentary_Months: 0,
        Ledger_Name: 'Acme_Receivables',
        Total_Amount: '₹150,000',
        Tax: '₹27,000',
        Grand_Total: '₹177,000',
        Comments: 'Quarterly billing for services',
        Security_Deposit: '₹10,000'
      }))


      return {
        InvoiceAdd,
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
