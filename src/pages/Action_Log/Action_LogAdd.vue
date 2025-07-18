<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>

  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Add Activity Log</div>
           <q-btn color="primary text-capitalize" label="Save" icon="save" />
      </div>
      <div class="text-subtitle2">Activity Management</div>
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
                      Lead information
                    </q-item-section>


                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <!--   Date Picker -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Lead Source" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="Status" label="Select Activity Type" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Task Name" />
                        </div>


                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Location" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Activity Date Time" :hide-bottom-space="true">
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
                          <q-input dense outlined v-model="text" label="Duration" />
                        </div>

                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Search User" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">

                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined type="textarea" v-model="message" placeholder="Remark" rows="2" />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-radio dense v-model="shape" val="line" label="Next Activity" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Follow up Activity On" :hide-bottom-space="true">
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
                          <q-select dense outlined v-model="model" :options="options" label="Select Follow up activity Type" />
                          
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-btn color="primary text-capitalize" label="Upload" icon="arrow_upload_ready" />

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
    name: 'LeadPage',
    data() {
      return {
        shape: ref('line'),
        Status: [
          'New', 'Contacted', 'Qualified', 'Nurturing', 'Disqualified', 'Converted'
        ],
        Priority: [
          'High', 'Medium', 'Low' 
        ],
        Timeframe: [
          'Immediate', '1-3 Months', '3-6 Months', '6+ Months'
        ],
        options: [
          'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
        ],
        selectedClient: null,
        clients: [
          { id: 1, name: 'John Doe', email: 'john@example.com', company: 'Acme Inc.' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'Globex Corp' },
          { id: 3, name: 'Alice Brown', email: 'alice@example.com', company: 'Initech' },
          { id: 4, name: 'Bob Johnson', email: 'bob@example.com', company: 'Umbrella LLC' },
          { id: 5, name: 'Eve Davis', email: 'eve@example.com', company: 'Stark Industries' },
        ],
        columns: [
          { name: 'name', required: true, label: 'Name', align: 'left', field: 'name' },
          { name: 'email', label: 'Email', align: 'left', field: 'email' },
          { name: 'company', label: 'Company', align: 'left', field: 'company' },
        ],
        text: '',
        date: '',
        Number: '',
        message: '',
        time: ref('10:56'),
        timeWithSeconds: ref('10:56:00')
      };
    },
    methods: {
      onClientSelect(client) {
        console.log('Selected client:', client)
      }
    }
  }
</script>
