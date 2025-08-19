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
        <div class="text-h6">Edit Opportunity</div>
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
                <q-expansion-item default-opened>
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
                          <ClientSearchSelect label="Search Account"
                                              v-model="selectedClient"
                                              @select="onClientSelect" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <ContactPersonSearchSelect 
                            label="Select Contact Person"
                            v-model="selectedContact"
                            :clientId="selectedClient?.id"
                            @select="onContactSelect" />
                        </div>                        
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedStatus" :options="options" label="Select Opportunity Status" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedUser" :options="users" label="Select Assigned To" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedCompetitor" :options="competitors" label="Select Competitor to be Replaced" />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="selectedPriority" :options="priorities" label="Select Priority" />
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

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedSource" :options="opportunitySources" label="Select Opportunity Source" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedProductType" :options="productTypes" label="Product Type" />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedLossReason" :options="lossReasons" label="Loss Reason" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <!-- Use the ProductValueTable component here -->
                <ProductValueTable 
                  title="Opportunity Value" 
                  :initialRows="productRows" 
                  @update:rows="updateProductRows" 
                />

                <q-separator />

                <q-expansion-item default-opened>
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
                          <q-input dense outlined v-model="firstName" label="First Name" />

                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="lastName" label="Last Name" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <!--   Date Picker -->
                          <q-input dense outlined v-model="emailAddress" label="Email Address" />
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
                      Follow Up Activity
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md" style="max-height: 400px; overflow-y: auto;">
                    <q-card-section>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-checkbox v-model="hasNextActivity" label="Follow up Activity" @update:model-value="onNextActivityChange" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="followUpActivityType" :options="activityTypes" label="Select Follow up activity Type" :disable="!hasNextActivity" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <div class="row q-col-gutter-sm">
                            <div class="col-6">
                              <q-input dense outlined v-model="followUpDate" label="Follow up Date" :disable="!hasNextActivity" :hide-bottom-space="true">
                                <template v-slot:append>
                                  <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-date v-model="followUpDate">
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-date>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                            <div class="col-6">
                              <q-input dense outlined v-model="followUpTime" label="Follow up Time" :disable="!hasNextActivity" :hide-bottom-space="true">
                                <template v-slot:append>
                                  <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                      <q-time v-model="followUpTime" format24h>
                                        <div class="row items-center justify-end">
                                          <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                      </q-time>
                                    </q-popup-proxy>
                                  </q-icon>
                                </template>
                              </q-input>
                            </div>
                          </div>
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
import ClientSearchSelect from '../../components/ClientSearchSelect.vue';
import ContactPersonSearchSelect from '../../components/ContactPersonSearchSelect.vue';
import ProductValueTable from '../../components/ProductValueTable.vue';

export default {
  name: 'OpportunityPage',
  components: {
    ClientSearchSelect,
    ContactPersonSearchSelect,
    ProductValueTable
  },
  data() {
    return {
      selectedClient: null,
      selectedContact: null,
      selectedCompetitor: null,
      selectedUser: null,
      selectedPriority: null,
      selectedSource: null,
      selectedProductType: null,
      selectedLossReason: null,
      selectedStatus: null,
      options: [
        'New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost', 'On Hold', 'Cancelled'
      ],
      competitors: [
        'Microsoft', 'IBM', 'SAP', 'Salesforce', 'Oracle', 'Adobe', 'Workday', 'ServiceNow', 'Tableau', 'Zendesk'
      ],
      users: [
        'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson', 'Jessica Taylor', 'Robert Martinez'
      ],
      opportunitySources: [
        'Website', 'Referral', 'Email Campaign', 'Trade Show', 'Cold Call', 'Social Media', 'Partner'
      ],
      productTypes: [
        'Data Feed', 'Terminal'
      ],
      lossReasons: [
        'Lost to Competitor', 'No Budget/lost funding', 'No Decision/Non-Responsive', 'Price', 'Other'
      ],
      priorities: [
        'High', 'Medium', 'Low'
      ],
      opstatus: [
        'Open', 'Closed-Won', 'Closed-Lost'
      ],
      optype: [
        'New Business', 'Existing'
      ],
      hasNextActivity: true,
      followUpDate: '2025/06/20',
      followUpTime: '14:30',
      followUpActivityType: 'Meeting',
      activityTypes: [
        'Call', 'Email', 'Meeting', 'Demo', 'Proposal', 'Follow-up'
      ],
      text: '',
      date: '',
      model: null,
      Number: '',
      remarks: '', // Added remarks field he
      // Contact information fields
      firstName: '',
      lastName: '',
      emailAddress: '',
      productRows: [
        { id: 1, product_type: "Package", name: 'Equity', rate: 250, quoted_price: 250, quantity: 2, currency: 'INR' },
        { id: 2, product_type: "Add On", name: 'Mobile', rate: 300, quoted_price: 300, quantity: 5, currency: 'USD' }
      ]
    };
  },
  methods: {
    onClientSelect(client) {
      console.log('Selected client:', client);
      // Reset contact person when client changes
      this.selectedContact = null;
    },
    onContactSelect(contact) {
      console.log('Selected contact:', contact);
      if (contact) {
        // Split the name into first and last name
        const nameParts = contact.name.split(' ');
        this.firstName = nameParts[0] || '';
        this.lastName = nameParts.slice(1).join(' ') || '';
        this.emailAddress = contact.email || '';
      }
    },
    updateProductRows(rows) {
      this.productRows = rows;
    },
    onNextActivityChange(value) {
      console.log('Next activity:', value);
      if (!value) {
        this.followUpDate = '';
        this.followUpTime = '';
        this.followUpActivityType = null;
      }
    }
  }
}
</script>
