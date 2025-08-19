<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>

  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Add Subscription</div>
        <q-btn color="primary text-capitalize" label="Save" icon="save" />
      </div>
      <div class="text-subtitle2">Subscription Management</div>
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
                      Subscription Information
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="gtcNo" label="GTC No." />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Subscription Date" :hide-bottom-space="true">
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
                          <q-input dense outlined v-model="subscriptionNo" label="Subscription No" />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <ClientSearchSelect label="Search Account"
                                              v-model="selectedClient"
                                              @select="onClientSelect" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <ProposalSearchSelect label="Search Proposal"
                                                v-model="selectedProposal"
                                                @select="onProposalSelect" />
                        </div>
                                                <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedProductType" :options="ProductTypes" label="Product Type" :disable="true" />
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
                      Subscription Value
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center ">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-10 m-auto">
                          <q-table :rows="rows"
                                   :columns="tableColumns"
                                   row-key="id"
                                   :pagination="{ rowsPerPage: 0 }"
                                   :rows-per-page-options="[0]"
                                   flat
                                   bordered>
                            <template v-slot:body-cell-product_type="props">
                              <q-td :props="props" width="200">
                                {{ props.row.product_type }}
                              </q-td>
                            </template>

                            <template v-slot:body-cell-billing_currency="props">
                              <q-td :props="props" width="150" class="text-center">
                                {{ props.row.billing_currency }}
                              </q-td>
                            </template>

                            <template v-slot:body-cell-exchange_rate="props">
                              <q-td :props="props" width="150" class="text-center">
                                {{ props.row.exchange_rate }}
                              </q-td>
                            </template>

                            <template v-slot:body-cell-name="props">
                              <q-td :props="props" width="400">
                                {{ props.row.name }}
                              </q-td>
                            </template>

                            <template v-slot:body-cell-rate="props">
                              <q-td :props="props" width="200" class="text-right">
                                {{ props.row.rate }}
                              </q-td>
                            </template>

                            <template v-slot:body-cell-quantity="props">
                              <q-td :props="props" width="200" class="text-right">
                                {{ props.row.quantity }}
                              </q-td>
                            </template>

                            <template v-slot:body-cell-currency="props">
                              <q-td :props="props" width="100" class="text-center">
                                {{ props.row.currency }}
                              </q-td>
                            </template>

                            <template v-slot:body-cell-total="props">
                              <q-td :props="props" width="200" outlined class="text-right">
                                {{ (props.row.rate * props.row.quantity) || 0 }}
                              </q-td>
                            </template>
                          </q-table>
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="schedule" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Billing & Subscription Details
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedBillingFrequency" :options="billingFrequencies" label="Billing Frequency" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="startBillDate" mask="date" :rules="['date']" label="Start Bill Date" :hide-bottom-space="true">
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                  <q-date v-model="startBillDate">
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
                          <q-input dense outlined v-model="subscriptionStartDate" mask="date" :rules="['date']" label="Subscription Start Date" :hide-bottom-space="true">
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                  <q-date v-model="subscriptionStartDate">
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
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="selectedInitialTerm" label="Initial Term (Months)" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="selectedRenewalTerm" label="Renewal Term (Months)" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedAdvanceInvoicingPeriod" :options="advanceInvoicingPeriods" label="Advance Invoicing Period" />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedBillingCurrency" :options="billingCurrencies" label="Billing Currency" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedExchangeRate" :options="exchangeRates" label="Exchange Rate" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="contacts" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Contact Details
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-6">
                          <ContactPersonSearchSelect 
                            label="Billing Contact Details"
                            v-model="selectedBillingContact"
                            :clientId="selectedClient?.id"
                            @select="onBillingContactSelect" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-6">
                          <ContactPersonSearchSelect 
                            label="Technical Contact Details"
                            v-model="selectedTechnicalContact"
                            :clientId="selectedClient?.id"
                            @select="onTechnicalContactSelect" />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12">
                          <ClientAddressSelect 
                            label="Billing Address"
                            v-model="selectedBillingAddress"
                            :clientId="selectedClient?.id"
                            @select="onBillingAddressSelect" />
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
                      Terms and conditions
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12">
                          <q-table
                            :rows="selectedTermsDetails"
                            :columns="[
                              { name: 'name', label: 'Term', field: 'name', align: 'left' },
                              { name: 'description', label: 'Standard Description', field: 'description', align: 'left' },
                              { name: 'customDescription', label: 'Custom Description', field: 'customDescription', align: 'left' },
                              { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
                            ]"
                            row-key="id"
                            flat
                            bordered>
                            
                            <template v-slot:body-cell-customDescription="props">
                              <q-td :props="props">
                                <q-input v-model="props.row.customDescription" outlined dense />
                              </q-td>
                            </template>
                            
                            <template v-slot:body-cell-actions="props">
                              <q-td :props="props" class="text-center">
                                <q-btn flat round icon="delete" color="red" @click="selectedTermsDetails = selectedTermsDetails.filter(term => term.id !== props.row.id)" />
                              </q-td>
                            </template>
                          </q-table>
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
  
  <!-- Terms and Conditions Dialog -->
  <q-dialog v-model="termsDialogVisible" persistent>
    <q-card style="min-width: 700px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Select Terms and Conditions</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      
      <q-card-section>
        <q-table
          :rows="termsOptions"
          :columns="[
            { name: 'select', label: 'Select', field: 'select', align: 'center' },
            { name: 'name', label: 'Term', field: 'name', align: 'left' },
            { name: 'description', label: 'Description', field: 'description', align: 'left' }
          ]"
          row-key="id"
          flat
          bordered>
          
          <template v-slot:body-cell-select="props">
            <q-td :props="props" class="text-center">
              <q-checkbox v-model="props.row.selected" />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      
      <q-card-section align="right">
        <q-btn color="primary" label="Select" @click="selectTerms" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from 'vue';
  import ClientSearchSelect from '../../components/ClientSearchSelect.vue';
  import ContactPersonSearchSelect from '../../components/ContactPersonSearchSelect.vue';
  import ProposalSearchSelect from '../../components/ProposalSearchSelect.vue';
  import ClientAddressSelect from '../../components/ClientAddressSelect.vue';

  const ProductTypes = ['Data Feed', 'Terminal'];
  const billingFrequencies = ['Quarterly', 'Half yearly', 'Annual'];
  const billingCurrencies = ['INR', 'USD'];
  const exchangeRates = ['RBI', 'SBI'];
  const advanceInvoicingPeriods = ['0', '1', '2', '3', '4', '5', '6'];

  const gtcNo = ref('');
  const subscriptionNo = ref('');
  const date = ref('');
  const startBillDate = ref('');
  const subscriptionStartDate = ref('');
  const remarks = ref('');
  const termsDialogVisible = ref(false);

  const selectedClient = ref(null);
  const selectedProposal = ref(null);
  const selectedProductType = ref(null);
  const selectedBillingFrequency = ref(null);
  const selectedInitialTerm = ref('24');
  const selectedRenewalTerm = ref('24');
  const selectedAdvanceInvoicingPeriod = ref(null);
  const selectedBillingCurrency = ref(null);
  const selectedExchangeRate = ref(null);
  const selectedBillingContact = ref(null);
  const selectedTechnicalContact = ref(null);
  const selectedBillingAddress = ref(null);
  
  // Terms and conditions data
  const termsOptions = ref([
    { id: 1, name: 'Payment Terms', description: 'Payment due within 30 days of invoice', selected: false },
    { id: 2, name: 'Delivery Terms', description: 'Delivery within 14 days of order confirmation', selected: false },
    { id: 3, name: 'Warranty', description: '12 months warranty on all products', selected: false },
    { id: 4, name: 'Support', description: '24/7 technical support included', selected: false },
    { id: 5, name: 'Cancellation', description: 'Cancellation fee applies if cancelled within 7 days of delivery', selected: false },
    { id: 6, name: 'Confidentiality', description: 'All information shared is confidential', selected: false },
    { id: 7, name: 'Intellectual Property', description: 'All IP rights remain with the provider', selected: false }
  ]);
  
  const selectedTermsDetails = ref([
    { id: 1, name: 'Payment Terms', description: 'Payment due within 30 days of invoice', customDescription: '' },
    { id: 2, name: 'Delivery Terms', description: 'Delivery within 14 days of order confirmation', customDescription: '' },
    { id: 3, name: 'Warranty', description: '12 months warranty on all products', customDescription: '' },
    { id: 4, name: 'Support', description: '24/7 technical support included', customDescription: '' },
    { id: 5, name: 'Cancellation', description: 'Cancellation fee applies if cancelled within 7 days of delivery', customDescription: '' },
    { id: 6, name: 'Confidentiality', description: 'All information shared is confidential', customDescription: '' },
    { id: 7, name: 'Intellectual Property', description: 'All IP rights remain with the provider', customDescription: '' }
  ]);

  const onClientSelect = (client) => {
    console.log('Selected client:', client);
  };

  const onProposalSelect = (proposal) => {
    console.log('Selected proposal:', proposal);
    // Load product type from proposal
    selectedProductType.value = proposal?.productType || null;
  };

  const onBillingContactSelect = (contact) => {
    console.log('Selected billing contact:', contact);
  };

  const onTechnicalContactSelect = (contact) => {
    console.log('Selected technical contact:', contact);
  };

  const onBillingAddressSelect = (address) => {
    console.log('Selected billing address:', address);
  };

  // Table Data (disabled/read-only)
  const rows = ref([
    { id: 1, product_type: "Package", billing_currency: 'INR', exchange_rate: 'RBI', name: 'Equity', rate: 250, quantity: 2, currency: 'INR' },
    { id: 2, product_type: "Add On", billing_currency: 'USD', exchange_rate: 'SBI', name: 'Mobile', rate: 300, quantity: 5, currency: 'USD' },
    { id: 3, product_type: "Add on", billing_currency: 'INR', exchange_rate: 'RBI', name: 'Finance', rate: 400, quantity: 1, currency: 'INR' },
  ]);

  const tableColumns = [
    { name: 'product_type', label: 'Product Type', field: 'product_type', align: 'left' },
    { name: 'billing_currency', label: 'Billing Currency', field: 'billing_currency', align: 'center' },
    { name: 'exchange_rate', label: 'Exchange Rate', field: 'exchange_rate', align: 'center' },
    { name: 'name', label: 'Product', field: 'name', align: 'left' },
    { name: 'rate', label: 'Rate', field: 'rate', align: 'right' },
    { name: 'quantity', label: 'No Of Ids', field: 'quantity', align: 'right' },
    { name: 'currency', label: 'Currency', field: 'currency', align: 'center' },
    { name: 'total', label: 'Total', field: 'total', align: 'right' }
  ];
</script>