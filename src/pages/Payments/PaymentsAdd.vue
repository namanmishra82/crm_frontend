<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>

  <q-card class="my-card q-ma-md">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Add Payments </div>
        <q-btn color="primary text-capitalize" label="Save" icon="save" />
      </div>
      <div class="text-subtitle2">Payments Management</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section class="q-px-none" >
      <div class="q-px-none field-add-tab">
        <div class="row q-col-gutter-md items-center">
          <div class="col-12 col-sm-6 col-md-4 col-lg-12">
            <!-- Date Picker goes here -->

            <div class="q-pa-md">
              <q-list bordered class="rounded-borders">
                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="info" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Request information
                    </q-item-section>


                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <!--   Date Picker -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="form.client" :options="options" label="Select Client" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined  v-model="form.client" :options="Status" label="Select Invoice (s)" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="form.paymentRefNo" label="Payment Ref No" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <!--   Date Picker -->
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Select Payment From" :hide-bottom-space="true">
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
                          <!--   Date Picker -->
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Payment Receipt Date " :hide-bottom-space="true">
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
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                       
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="form.receivedAmount" label="Received Amount " />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="form.tds" label="TDS" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="form.tdsOnGst" label="TDS on GST" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="form.invoiceAmount" label="Invoice Amount" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined type="textarea" v-model="message" placeholder="Comment" rows="2" />
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
  export default {
    name: 'LeadPage',
    data() {
      return {
        Status: [
          'New', 'Contacted', 'Qualified', 'Nurturing', 'Disqualified', 'Converted'
        ],
        options: [
          'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
        ],
        form: {
          client: '',
          invoice: '',
          paymentRefNo: '',
          paymentFrom: '',
          paymentReceipt: '',
          receivedAmount: '',
          tds: '',
          tdsOnGst: '',
          invoiceAmount: '',
          comments: ''
        }
      };
    }
  }
</script>
