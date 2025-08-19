<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>

  <q-card class="my-card q-ma-md">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">
          Add Non Commercial
        </div>
        <q-btn color="primary text-capitalize" label="Save" icon="save" />
      </div>
      <div class="text-subtitle2">
        Non Commercial Management
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
                      Request Information
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
                      Change Options
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <!-- Change Client Name -->
                      <div class="row q-col-gutter-md items-center q-mb-lg">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-checkbox v-model="changeClientName" label="Change Client Name" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="newClientName" label="New Client Name" :disable="!changeClientName" />
                        </div>
                      </div>

                      <!-- Change Billing Address -->
                      <div class="row q-col-gutter-md items-center q-mb-lg">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-checkbox v-model="changeBillingAddress" label="Change Billing Address" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedAddress" :options="addressOptions" label="Address Selection" :disable="!changeBillingAddress" />
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
  name: 'NonCommercialBAdd',
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
      changeClientName: false,
      newClientName: '',
      changeBillingAddress: false,
      selectedAddress: null,
      
      // Options
      addressOptions: ['Primary Address', 'Secondary Address', 'Billing Address', 'Shipping Address'],
      
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
