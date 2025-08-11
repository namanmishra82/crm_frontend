<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>
  <q-card class="my-card q-ma-sm q-pa-sm col-auto">
    <q-card-section class="q-px-none q-pa-none">
      <div class="container">
        <div class="progress-container">
          <div class="step active">Working</div>
          <div class="arrow arrow-working"></div>
          <div class="step contact">Contacted</div>
          <div class="arrow arrow-contact"></div>
          <div class="step inactive">Closed - Not Converted</div>
          <div class="arrow arrow-inactive"></div>
          <div class="step inactive">Disqualified</div>
          <div class="arrow"></div>
          <div class="step inactive">Converted</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Edit Lead</div>
        <q-btn color="primary text-capitalize" label="Save" icon="save" />
      </div>
      <div class="text-subtitle2">Lead Management</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section class="q-px-none">
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
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="Status" label="Select Status" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="options" label="Select Assigned To" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="Priority" label="Select Priority" />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Lead Source Campaign " />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Event Name" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <!--   Date Picker -->
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Event Date" :hide-bottom-space="true">
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

                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="contact_support" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Lead Contact Information
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">

                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <!--   Date Picker -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Salutation" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="text" label="First Name" />

                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="text" label="Last Name" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <!--   Date Picker -->
                          <q-input dense outlined v-model="text" label="Email Address" />
                        </div>

                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="Number" label="Office Contact No" maxlength="10" mask="##########" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="Number" label="Mobile" type="tel" maxlength="10" mask="##########" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Job Title" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Department" />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <SearchableSelect label="Search Account"
                                            :data="clients"
                                            :columns="columns"
                                            v-model="selectedClient"
                                            @select="onClientSelect" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Industry" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Outreach" />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Address" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="text" label="City" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="text" label="State" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="Number" label="Postal Code" type="tel" maxlength="8" mask="########" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="options" label="Select Country" />
                        </div>

                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="LinkedIn Company" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="LinkedIn Personal URL" />
                        </div>

                      </div>
                    </q-card-section>

                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="attractions" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Lead Qualification & Activity
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md" style="max-height: 400px; overflow-y: auto;">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <!--   Date Picker -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="Number" label="Budget" type="tel" maxlength="8" mask="########" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="Timeframe" label="Select Timeframe to Purchase " />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                        </div>

                      </div>

                    </q-card-section>
                  </q-card>


                </q-expansion-item>
                <q-separator />

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
                          <q-input type="textarea"
                                   outlined
                                   v-model="remarks"
                                   label="Remarks"
                                   autogrow
                                   :rows="4" />
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
        remarks: ''
      };
    },
    methods: {
      onClientSelect(client) {
        console.log('Selected client:', client)
      }
    }
  }
</script>
