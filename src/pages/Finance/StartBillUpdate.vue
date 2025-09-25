<template>
  <br />
  <router-link to="/StartBill" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Start Bill List
  </router-link>

  <q-card class="my-card q-ma-md">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Update Start Bill</div>
        <q-btn color="primary text-capitalize" label="Save" icon="save" />
      </div>
      <div class="text-subtitle2">Start Bill Update Management</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section class="q-px-none">
      <div class="q-px-none field-add-tab">
        <div class="row q-col-gutter-md items-center">
          <div class="col-12 col-sm-6 col-md-4 col-lg-12">
            <div class="q-pa-md">
              <q-list bordered class="rounded-borders">
                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="info" color="primary" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      Subscription Information (Read Only)
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="subscriptionData.clientName" label="Client Name" readonly />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="subscriptionData.smsId" label="SMS ID" readonly />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="subscriptionData.packageName" label="Package Name" readonly />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="subscriptionData.startDate" label="Start Date" readonly />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="subscriptionData.amount" label="Amount" readonly />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="subscriptionData.billingCycle" label="Billing Cycle" readonly />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="edit" color="primary" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      Editable Fields
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-select dense outlined v-model="taxApplicable" :options="taxOptions" label="Tax Applicable" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-select dense outlined v-model="gstType" :options="gstTypeOptions" label="GST Type" :disable="taxApplicable !== 'Yes'" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-input dense outlined v-model="ledgerName" label="Ledger Name" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-select dense outlined v-model="amSupport" :options="amSupportOptions" label="AM Support" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="contact_support" color="primary" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      Subscription Value
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12">
                          <q-table 
                            :rows="subscriptionValueRows"
                            :columns="subscriptionValueColumns"
                            row-key="id"
                            :pagination="{ rowsPerPage: 0 }"
                            :rows-per-page-options="[0]"
                            flat
                            bordered>
                            <template v-slot:body-cell-total="props">
                              <q-td :props="props" class="text-right">
                                {{ (props.row.rate * props.row.quantity) || 0 }}
                              </q-td>
                            </template>
                          </q-table>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="table_chart" color="primary" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      Contact & Package Details
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-mb-md">
                        <div class="col-12">
                          <q-btn color="primary" label="Add Row" icon="add" @click="addTableRow" />
                        </div>
                      </div>
                      
                      <q-table
                        :rows="tableRows"
                        :columns="tableColumns"
                        row-key="id"
                        dense
                        flat
                        bordered>
                        <template v-slot:body-cell-contact_person="props">
                          <q-td :props="props">
                            <ContactPersonSearchSelect 
                              v-model="props.row.contact_person"
                              label="Select Contact"
                              dense />
                          </q-td>
                        </template>
                        <template v-slot:body-cell-sms_id="props">
                          <q-td :props="props">
                            <q-input dense outlined v-model="props.row.sms_id" />
                          </q-td>
                        </template>
                        <template v-slot:body-cell-package_name="props">
                          <q-td :props="props">
                            <q-select dense outlined v-model="props.row.package_name" :options="packageOptions" />
                          </q-td>
                        </template>
                        <template v-slot:body-cell-add_on="props">
                          <q-td :props="props">
                            <q-select dense outlined v-model="props.row.add_on" :options="addOnOptions" multiple />
                          </q-td>
                        </template>
                        <template v-slot:body-cell-actions="props">
                          <q-td :props="props" class="text-center">
                            <q-btn flat round icon="delete" size="sm" color="red" @click="removeTableRow(props.row.id)" />
                          </q-td>
                        </template>
                      </q-table>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import ContactPersonSearchSelect from '../../components/ContactPersonSearchSelect.vue'
import apiService from '../../services/apiService.js'

export default {
  name: 'StartBillUpdate',
  components: {
    ContactPersonSearchSelect
  },
  data() {
    return {
      subscriptionData: {
        clientName: 'Acme Corporation',
        smsId: 'SMS001',
        packageName: 'Premium Package',
        startDate: '2024-01-15',
        amount: '₹25,000',
        billingCycle: 'Monthly'
      },
      taxApplicable: null,
      gstType: null,
      ledgerName: '',
      amSupport: null,
      
      taxOptions: ['Yes', 'No'],
      gstTypeOptions: ['Regular', 'Exempt'],
      amSupportOptions: ['Yes', 'No'],
      packageOptions: ['Basic', 'Standard', 'Premium', 'Enterprise'],
      addOnOptions: ['SMS Pack', 'Email Support', 'Priority Support', 'Custom Reports', 'API Access'],
      
      subscriptionValueRows: [
        { id: 1, product_type: "Package", billing_currency: 'INR', exchange_rate: 'RBI', name: 'Equity', rate: 250, quantity: 2, currency: 'INR' },
        { id: 2, product_type: "Add On", billing_currency: 'USD', exchange_rate: 'SBI', name: 'Mobile', rate: 300, quantity: 5, currency: 'USD' },
        { id: 3, product_type: "Add On", billing_currency: 'INR', exchange_rate: 'RBI', name: 'Finance', rate: 400, quantity: 1, currency: 'INR' }
      ],
      subscriptionValueColumns: [
        { name: 'product_type', label: 'Product Type', field: 'product_type', align: 'left' },
        { name: 'billing_currency', label: 'Billing Currency', field: 'billing_currency', align: 'center' },
        { name: 'exchange_rate', label: 'Exchange Rate', field: 'exchange_rate', align: 'center' },
        { name: 'name', label: 'Product', field: 'name', align: 'left' },
        { name: 'rate', label: 'Rate', field: 'rate', align: 'right' },
        { name: 'quantity', label: 'No Of Ids', field: 'quantity', align: 'right' },
        { name: 'currency', label: 'Currency', field: 'currency', align: 'center' },
        { name: 'total', label: 'Total', field: 'total', align: 'right' }
      ],
      
      tableRows: [
        { id: 1, contact_person: null, sms_id: '', package_name: null, add_on: [] }
      ],
      tableColumns: [
        { name: 'contact_person', label: 'Contact Person', field: 'contact_person', align: 'left' },
        { name: 'sms_id', label: 'SMS ID', field: 'sms_id', align: 'left' },
        { name: 'package_name', label: 'Package Name', field: 'package_name', align: 'left' },
        { name: 'add_on', label: 'Add On', field: 'add_on', align: 'left' },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
      ]
    }
  },
  async mounted() {
    const id = this.$route.params.id
    if (id) {
      await this.loadStartBill(id)
    }
  },
  methods: {
    async loadStartBill(id) {
      try {
        const data = await apiService.getStartBill(id)
        // Update subscription data with API response
        this.subscriptionData = data.subscriptionData || this.subscriptionData
        this.subscriptionValueRows = data.subscriptionValue || this.subscriptionValueRows
      } catch (error) {
        console.error('Error loading start bill:', error)
      }
    },
    async saveStartBill() {
      try {
        const id = this.$route.params.id
        const data = {
          taxApplicable: this.taxApplicable,
          gstType: this.gstType,
          ledgerName: this.ledgerName,
          amSupport: this.amSupport,
          tableRows: this.tableRows
        }
        await apiService.updateStartBill(id, data)
        console.log('Start bill updated successfully')
      } catch (error) {
        console.error('Error saving start bill:', error)
      }
    },
    addTableRow() {
      const newId = Math.max(...this.tableRows.map(row => row.id)) + 1
      this.tableRows.push({
        id: newId,
        contact_person: null,
        sms_id: '',
        package_name: null,
        add_on: []
      })
    },
    removeTableRow(id) {
      this.tableRows = this.tableRows.filter(row => row.id !== id)
    }
  }
}
</script>

<style scoped>
.q-table td {
  padding: 8px;
}
</style>