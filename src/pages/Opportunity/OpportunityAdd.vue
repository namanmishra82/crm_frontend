<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>

  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Add Opportunity</div>
        <q-btn color="primary text-capitalize" label="Save" icon="save" />
      </div>
      <div class="text-subtitle2">Opportunity Management</div>
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
                      Opportunity Information
                    </q-item-section>


                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <!--   Date Picker -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Opportunity Name " />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Account Name" />
                        </div>

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <SearchableSelect
                            label="Search Client"
                            :data="clients"
                            :columns="columns"
                            v-model="selectedClient"
                            @select="onClientSelect"
                          />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Opportunity Source" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Opportunity Status" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Assigned To" />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Competitor to be Replaced " />


                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="Priority" label="Select Priority" />
                        </div>
                        
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Expected Close Date" :hide-bottom-space="true">
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
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2 d-none">


                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Date created" :hide-bottom-space="true">
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
                          <div class="col-12 col-sm-6 col-md-4 col-lg-2 d-none">
                             
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Created Date" :hide-bottom-space="true">
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

                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="contact_support" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Opportunity Value
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">

                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <!--   Date Picker -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Product" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="Number" label="No of IDs" maxlength="10" mask="##########" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="Number" label="Opportunity Amount" maxlength="10" mask="##########" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="text" label="Probability" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="text" label="Discount" />
                        </div>
                      </div>

                    </q-card-section>

                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="attractions" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Opportunity Contact Information
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md" style="max-height: 400px; overflow-y: auto;">
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

                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="options" label="Select Account Name" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="options" label="Select Asset Focus" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="options" label="Select Function" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="options" label="Select Persona" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="options" label="Select Industry" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
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
                          <q-input dense outlined type="textarea" v-model="message" placeholder="Comment" rows="2" />
                        </div>
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
                <q-expansion-item>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="attractions" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Opportunity Status and Closure
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md" style="max-height: 400px; overflow-y: auto;">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <!--   Date Picker -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="opstatus" label="Select Opportunity Status" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Reason Won/Lost" type="textarea" autogrow :rows="3" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Closed Date" :hide-bottom-space="true">
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

                        <!--   Date Picker -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense
                                   outlined
                                   v-model="text"
                                   label="Competitor Analysis"
                                   type="textarea"
                                   :rows="3"
                                   :autogrow="false" />
                           
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Win Percentage " />
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
  import SearchableSelect from '../../components/SearchableSelect.vue'
  export default {
    name: 'LeadPage',
    components: {
      SearchableSelect
    },
    data() {
      return {
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
        text: '',
        date: '',
        model: null,
        Number: '',
        message: ''
      };
    },
    methods: {
      onClientSelect(client) {
        console.log('Selected client:', client)
      }
    }
  }
</script>
