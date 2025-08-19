<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>

  <q-card class="my-card q-ma-md">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">
          Add Change Bill Commercial
        </div>
        <q-btn color="primary text-capitalize" label="Save" icon="save" />
      </div>
      <div class="text-subtitle2">
        Change Bill Commercial Management
      </div>
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
                      Change Bill Information
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <AccountSearchSelect 
                            label="Search Account"
                            v-model="selectedAccount"
                            @select="onAccountSelect" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <SmsIdMultiSelect 
                            label="Select SMS IDs"
                            v-model="selectedSmsIds"
                            @change="onSmsIdsChange"
                            :show-selected-in-form="false" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="effectiveDate" mask="date" :rules="['date']" label="Select Effective From" :hide-bottom-space="true">
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                  <q-date v-model="effectiveDate">
                                    <div class="row items-center justify-end">
                                      <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>
                      </div>
                      
                      <!-- Selected SMS IDs Display Row -->
                      <div v-if="selectedSmsIds.length > 0" class="row q-mt-md">
                        <div class="col-12">
                          <q-table
                            :rows="selectedSmsIds"
                            :columns="smsDisplayColumns"
                            row-key="id"
                            dense
                            flat
                            hide-bottom
                            class="selected-sms-table">
                            <template v-slot:body-cell-actions="props">
                              <q-td :props="props">
                                <q-btn flat round icon="close" size="sm" color="red" @click="removeSmsId(props.row)" />
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
                      <q-avatar icon="settings" color="primary" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      Change Package Options
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <!-- Change Invoice Date -->
                      <div class="row q-col-gutter-md items-center q-mb-lg">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-checkbox v-model="changeInvoiceDate" label="Change Invoice Date" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-input dense outlined v-model="newInvoiceDate" mask="date" :rules="['date']" label="New Invoice Date" :disable="!changeInvoiceDate" :hide-bottom-space="true">
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                  <q-date v-model="newInvoiceDate">
                                    <div class="row items-center justify-end">
                                      <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                  </q-date>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>
                      </div>

                      <!-- Change Package -->
                      <div class="row q-col-gutter-md items-center q-mb-lg">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-checkbox v-model="changePackage" label="Change Package" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-select dense outlined v-model="selectedPackage" :options="packages" label="Select Package" :disable="!changePackage" />
                        </div>
                      </div>

                      <!-- Change Billing Cycle -->
                      <div class="row q-col-gutter-md items-center q-mb-lg">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-checkbox v-model="changeBillingCycle" label="Change Billing Cycle" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-select dense outlined v-model="selectedBillingCycle" :options="billingCycles" label="Billing Cycle" :disable="!changeBillingCycle" />
                        </div>
                      </div>

                      <!-- Change Complimentary Period -->
                      <div class="row q-col-gutter-md items-center q-mb-lg">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-checkbox v-model="changeComplimentary" label="Change Complimentary Period" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="complimentaryFromMonth" :options="months" label="From Month" :disable="!changeComplimentary" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="complimentaryFromYear" :options="years" label="From Year" :disable="!changeComplimentary" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="complimentaryMonths" :options="complimentaryMonthsOptions" label="Complimentary Months" :disable="!changeComplimentary" />
                        </div>
                      </div>

                      <!-- Change Billing Currency -->
                      <div class="row q-col-gutter-md items-center q-mb-lg">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-checkbox v-model="changeBillingCurrency" label="Change Billing Currency" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-select dense outlined v-model="selectedCurrency" :options="currencies" label="Billing Currency" :disable="!changeBillingCurrency" />
                        </div>
                      </div>

                      <!-- Change Billing Exchange Rate -->
                      <div class="row q-col-gutter-md items-center q-mb-lg">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-checkbox v-model="changeExchangeRate" label="Change Billing Exchange Rate" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-input dense outlined v-model="exchangeRate" label="Billing Exchange Rate" type="number" :disable="!changeExchangeRate" />
                        </div>
                      </div>

                      <!-- Change Add-on -->
                      <div class="row q-col-gutter-md items-center q-mb-lg">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-checkbox v-model="changeAddon" label="Change Add-on" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-btn color="primary text-capitalize" label="Add-on" icon="add" :disable="!changeAddon" />
                        </div>
                      </div>

                      <!-- Change Taxation -->
                      <div class="row q-col-gutter-md items-center q-mb-lg">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-checkbox v-model="changeTaxation" label="Change Taxation" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-select dense outlined v-model="selectedTax" :options="taxOptions" label="Tax Applicable" :disable="!changeTaxation" />
                        </div>
                      </div>

                      <!-- Change Other Charges -->
                      <div class="row q-col-gutter-md items-center q-mb-lg">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-checkbox v-model="changeOtherCharges" label="Change Other Charges" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-btn color="primary text-capitalize" label="Other Charges" icon="add" :disable="!changeOtherCharges" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="cloud_upload" color="primary" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      Upload Files
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-btn color="primary text-capitalize" label="Upload" icon="arrow_upload_ready" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="attractions" color="primary" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      Remarks
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12">
                          <q-input 
                            type="textarea" 
                            outlined 
                            v-model="remarks" 
                            label="Remarks" 
                            autogrow 
                            :rows="4" 
                          />
                        </div>
                      </div>
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
import AccountSearchSelect from '../../components/AccountSearchSelect.vue'
import SmsIdMultiSelect from '../../components/SmsIdMultiSelect.vue'

export default {
  name: 'CommercialBAdd',
  components: {
    AccountSearchSelect,
    SmsIdMultiSelect
  },
  data() {
    return {
      selectedAccount: null,
      selectedSmsIds: [],
      effectiveDate: '',
      remarks: '',
      
      // Change options
      changeInvoiceDate: false,
      newInvoiceDate: '',
      changePackage: false,
      selectedPackage: null,
      changeBillingCycle: false,
      selectedBillingCycle: null,
      changeComplimentary: false,
      complimentaryFromMonth: null,
      complimentaryFromYear: null,
      complimentaryMonths: null,
      changeBillingCurrency: false,
      selectedCurrency: null,
      changeExchangeRate: false,
      exchangeRate: '',
      changeAddon: false,
      changeTaxation: false,
      selectedTax: null,
      changeOtherCharges: false,
      
      // Options
      packages: ['Basic', 'Standard', 'Premium', 'Enterprise'],
      billingCycles: ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      years: ['2024', '2025', '2026', '2027', '2028'],
      complimentaryMonthsOptions: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      currencies: ['USD', 'EUR', 'GBP', 'INR', 'JPY'],
      taxOptions: ['Yes', 'No', 'Exempt'],
      
      smsDisplayColumns: [
        { name: 'sms_id', label: 'SMS ID', field: 'sms_id', align: 'left' },
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'package', label: 'Package', field: 'package', align: 'left' },
        { name: 'last_invoice_date', label: 'Last Invoice Date', field: 'last_invoice_date', align: 'left' },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
      ]
    }
  },
  methods: {
    onAccountSelect(account) {
      console.log('Selected account:', account)
    },
    onSmsIdsChange(smsIds) {
      console.log('Selected SMS IDs:', smsIds)
    },
    removeSmsId(smsId) {
      const index = this.selectedSmsIds.findIndex(item => item.id === smsId.id)
      if (index > -1) {
        this.selectedSmsIds.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.selected-sms-table {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>
