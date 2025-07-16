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
        Non Commercial
        Management
      </div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section class="q-px-none" >
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
                      Request information
                    </q-item-section>


                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <!--   Date Picker -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Client" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="Status" label="Select SMS Id" />
                        </div>

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <!--   Date Picker -->
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Select Effective From" :hide-bottom-space="true">
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
                          <q-checkbox v-model="val" label="Change Client Name" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-checkbox v-model="val" label="Change Billing Address" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="New client name" />

                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Address selection" />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined type="textarea" v-model="message" placeholder="Comment" rows="2" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-btn color="primary text-capitalize" label="Upload" icon="arrow_upload_ready" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">

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

  import { ref } from 'vue'
  export default {    
    name: 'FileUploader',
    data() {
      return {
        headers: [
          {
            name: 'X-Custom-Timestamp',
            value: String(Date.now())
          }
        ],
        val: ref(true),
        Status: [
          'New', 'Contacted', 'Qualified', 'Nurturing', 'Disqualified', 'Converted'
        ],
        Priority: [
          'High', 'Medium', 'Low' 
        ],
        Complimentarym: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9' 
        ],
        Timeframe: [
          'Immediate', '1-3 Months', '3-6 Months', '6+ Months'
        ],
        options: [
          'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
        ],
        text: ''
      };
    }
  }
</script>
