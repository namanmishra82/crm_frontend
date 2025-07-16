<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>

  <q-card class="my-card q-ma-md">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Add File</div>
         
      </div>
      <div class="text-subtitle2">Lead Management</div>
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
                      File information
                    </q-item-section>


                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <!--   Date Picker -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <!--   Date Picker -->
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Select Import For Date " :hide-bottom-space="true">
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
                          <q-select dense outlined v-model="model" :options="Status" label="Select Import Type " />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                            <q-btn color="primary text-capitalize" label="Upload" icon="Upload" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                         
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">

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
          'Desktop', 'Mobile' 
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
        text: ''
      };
    }
  }
</script>
