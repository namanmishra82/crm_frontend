<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>

  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Add Invoice</div>
        <q-btn color="primary text-capitalize" label="Save" icon="save" />
      </div>
      <div class="text-subtitle2">Invoice Management</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section class="q-px-none">
      <div class="q-px-none field-add-tab">
        <div class="row q-col-gutter-md items-center">
          <div class="col-12 col-sm-6 col-md-4 col-lg-12">
            <!-- Date Picker goes here -->

            <div class="q-pa-md">
              <q-list bordered class="rounded-borders">
                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="info" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Header Information
                    </q-item-section>


                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <!--   Date Picker -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                          <q-select dense outlined v-model="model" :options="options" label="Select Account Client" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="Document" label="Select Document Type" />
                        </div>

                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="ref" label="Select Ref Invoice" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Invoice From" :hide-bottom-space="true">
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


                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Invoice Till" :hide-bottom-space="true">
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
                        <div class="col-12 col-sm-6 col-md-4 col-lg-1 rounded-borders">
                          12 Month
                        </div>
                        </div>
                        <div class="row q-my-md q-col-gutter-md items-center">
                          <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                            <q-select dense outlined v-model="model" :options="options" label="Select Billing Address" />
                            
                          </div>
                          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                            <q-checkbox v-model="val"  label="Tax Applicable" />
                          </div>
                          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                            <q-select dense outlined v-model="model" :options="options" label="Select Billing Currency " />
                          </div>
                          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                            <q-select dense outlined v-model="model" :options="options" label="Select Billing Period" />
                          </div>
                          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                            <q-select dense outlined v-model="model" :options="options" label="Select Currency Selling Rate" />
                          </div>
                        </div>
                        <div class="row q-my-md q-col-gutter-md items-center">
                          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                            <q-checkbox v-model="val" label="Complimentary Applicable" />
                           </div>
                          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                            <q-select dense outlined v-model="model" :options="Priority" label="Complimentary From" />
                          </div>

                          <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                            <q-select dense outlined v-model="model" :options="Priority" label="Complimentary Months" />
                          </div>
                          <div class="col-12 col-sm-6 col-md-4 col-lg-2  ">
                            <q-input dense outlined v-model="text" label="Ledger Name" />
                          </div>
                          <div class="col-12 col-sm-6 col-md-4 col-lg-4 text-center">

                            Total Amount = 1250 | Tax = 250 | Grand Total = 1500
                          </div>
                        </div>
                        <div class="row q-my-md q-col-gutter-md items-center">
                          <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                            <q-input dense outlined type="textarea" v-model="message" placeholder="Comment" rows="2" />
                           </div>
                          <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                            <q-input dense outlined v-model="text" label="Security Deposit" />
                          </div>
                          <div class="col-12 col-sm-6 col-md-4 col-lg-4 text-center">

                            
                          </div>
                        </div>
              </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="contact_support" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Detail information
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">

                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select SMS Id" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Package ID / Add On / Other" />
                        </div>
                       
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Rate Per ID" />
                        </div>
                       
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                         
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Package Currency" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Ledger Name" :hide-bottom-space="true">
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
                       
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined type="textarea" v-model="message" placeholder="Comment" rows="2" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          Total= 1245
                         </div>
                       
                      </div>

                    </q-card-section>

                  </q-card>
                </q-expansion-item>

                <q-separator />

               
              </q-list>
            </div>
          </div>
        </div>

      </div>
    </q-card-section>
  </q-card>
</template>
<script>
  import { ref, computed } from 'vue'

  const search = ref('')
  const dropdown = ref(false)
  const model = ref(null)

  const clients = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Acme Inc.' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'Globex Corp' },
    { id: 3, name: 'Alice Brown', email: 'alice@example.com', company: 'Initech' },
    { id: 4, name: 'Bob Johnson', email: 'bob@example.com', company: 'Umbrella LLC' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', company: 'Stark Industries' },
  ])

  const columns = [
    { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name },
    { name: 'email', label: 'Email', align: 'left', field: row => row.email },
    { name: 'company', label: 'Company', align: 'left', field: row => row.company },
  ]

  const filteredClients = computed(() => {
    const term = search.value.toLowerCase()
    return clients.value.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.company.toLowerCase().includes(term)
    )
  })

  function selectClient(row) {
    model.value = row
    search.value = row.name
    dropdown.value = false
  }
  export default {
    name: 'LeadPage',
    data() {
      return {
        val: ref(true),
        search,
        dropdown,
        filteredClients,
        columns,
        
        selectClient,
        ref: [
          'Credit', '  Debit Note' 
        ],
        Document: [
          'Invoice', ' Credit Note', ' Debit Note' 
        ],
        options: [
          'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
        ],
        Priority: [
          'High', 'Medium', 'Low'
        ],
        opstatus: [
          'Open', 'Closed-Won', 'Closed-Lost'
        ],
        optype: [
          'New Business', 'Existing'
        ],
        text: ''
      };
    }
  }
</script>
