<template>
  <br />

  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>
  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <!-- Header Row with Title and Button on Right -->
      <div class="row items-center justify-between">
        <div class="text-h6">Change Bill Commercial</div>
        <q-btn color="primary text-capitalize" label="Add Bill" icon="playlist_add" @click="CommercialBAdd" />
      </div>
      <!-- Subtitle -->
      <div class="text-subtitle2">Change Bill Commercial Management</div>
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

      const CommercialBAdd = () => {
        router.push('/CommercialBAdd') // This route must be defined in your router
      }

      const selected = ref([])
      const date = ref('2019/02/01')
      const model = ref(null)

      const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']

      const columns = [
        { name: 'Client', required: true, label: 'Client', align: 'left', field: row => row.Client, format: val => `${val}`, sortable: true },
        { name: 'SMS_Id', align: 'left', label: 'SMS Id', field: 'SMS_Id', sortable: true },
        { name: 'Effective_From', align: 'left', label: 'Effective From', field: 'Effective_From', sortable: true },
        { name: 'Change_Invoice_Date', align: 'left', label: 'Change Invoice Date', field: 'Change_Invoice_Date', sortable: true },
        { name: 'New_Invoice_Date', align: 'left', label: 'New Invoice Date', field: 'New_Invoice_Date', sortable: true },
        { name: 'Change_Package', align: 'left', label: 'Change Package', field: 'Change_Package', sortable: true },
        { name: 'Package', align: 'left', label: 'Package', field: 'Package', sortable: true },
        { name: 'Change_Billing_Cycle', align: 'left', label: 'Change Billing Cycle', field: 'Change_Billing_Cycle', sortable: true },
        { name: 'Billing_Cycle', align: 'left', label: 'Billing Cycle', field: 'Billing_Cycle', sortable: true },
        { name: 'Change_Complimentary_Period', align: 'left', label: 'Change Complimentary Period', field: 'Change_Complimentary_Period', sortable: true },
        { name: 'Complimentary_From', align: 'left', label: 'Complimentary From', field: 'Complimentary_From', sortable: true },
        { name: 'Complimentary_Months', align: 'left', label: 'Complimentary Months', field: 'Complimentary_Months', sortable: true },
        { name: 'Change_Billing_Currency', align: 'left', label: 'Change Billing Currency', field: 'Change_Billing_Currency', sortable: true },
        { name: 'Billing_Currency', align: 'left', label: 'Billing Currency', field: 'Billing_Currency', sortable: true },
        { name: 'Change_Billing_Exchange_Rate', align: 'left', label: 'Change Billing Exchange Rate', field: 'Change_Billing_Exchange_Rate', sortable: true },
        { name: 'Billing_Exchange_Rate', align: 'left', label: 'Billing Exchange Rate', field: 'Billing_Exchange_Rate', sortable: true },
        { name: 'Change_Addon', align: 'left', label: 'Change Add-on', field: 'Change_Addon', sortable: true },
        { name: 'Addon', align: 'left', label: 'Add-on', field: 'Addon', sortable: true },
        { name: 'Change_Taxation', align: 'left', label: 'Change Taxation', field: 'Change_Taxation', sortable: true },
        { name: 'Tax_Applicable', align: 'left', label: 'Tax Applicable', field: 'Tax_Applicable', sortable: true },
        { name: 'Change_Other_Charges', align: 'left', label: 'Change Other Charges', field: 'Change_Other_Charges', sortable: true },
        { name: 'Other_Charges', align: 'left', label: 'Other Charges', field: 'Other_Charges', sortable: true },
        { name: 'Documents', align: 'left', label: 'Documents', field: 'Documents' },
        { name: 'Actions', align: 'left', label: 'Actions', field: 'Actions' }
      ]

      const rows = Array(12).fill().map(() => ({
        Client: 'Acme Corp',
        SMS_Id: 'SMS123',
        Effective_From: '2025-07-01',
        Change_Invoice_Date: 'Yes',
        New_Invoice_Date: '2025-07-10',
        Change_Package: 'Yes',
        Package: 'Premium Plan',
        Change_Billing_Cycle: 'No',
        Billing_Cycle: 'Monthly',
        Change_Complimentary_Period: 'Yes',
        Complimentary_From: '2025-07-01',
        Complimentary_Months: 2,
        Change_Billing_Currency: 'No',
        Billing_Currency: 'INR',
        Change_Billing_Exchange_Rate: 'No',
        Billing_Exchange_Rate: '1.00',
        Change_Addon: 'Yes',
        Addon: 'Extra Storage',
        Change_Taxation: 'No',
        Tax_Applicable: '18%',
        Change_Other_Charges: 'Yes',
        Other_Charges: '₹500',
        Documents: 'View File'
      }))


      return {
        CommercialBAdd,
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
