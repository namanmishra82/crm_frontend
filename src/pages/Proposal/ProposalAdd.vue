<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>

  <q-card class="my-card q-ma-sm col-auto">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Add Proposal</div>
        <q-btn color="primary text-capitalize" label="Save" icon="save" />
      </div>
      <div class="text-subtitle2">Proposal Management</div>
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
                      Proposal Information
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Proposal Name" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Proposal Date" :hide-bottom-space="true">
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
                          <q-input dense outlined v-model="text" label="Proposal No" />
                        </div>


                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <ClientSearchSelect label="Search Account"
                                              v-model="selectedClient"
                                              @select="onClientSelect" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <OpportunitySearchSelect label="Search Opportunity"
                                                   v-model="selectedOpportunity"
                                                   :showSelected="false"
                                                   @select="onOpportunitySelect" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedProposalType" :options="ProposalType" label="Proposal Type" />
                        </div>



                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedCompetitor" :options="competitors" label="Select Competitor to be Replaced" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedPriority" :options="Priority" label="Select Priority" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="selectedProductType" :options="ProductTypes" label="Product Type" />
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
                      Proposal Value
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
                                <q-select v-model="props.row.product_type" outlined :options="productTypeOptions" dense borderless />
                              </q-td>
                            </template>

                            <template v-slot:body-cell-name="props">
                              <q-td :props="props" width="400">
                                <q-select v-model="props.row.name" outlined :options="productOptions" dense borderless />
                              </q-td>
                            </template>

                            <template v-slot:body-cell-rate="props">
                              <q-td :props="props" width="200">
                                <q-input v-model.number="props.row.rate" input-class="text-right" type="number" outlined dense borderless />
                              </q-td>
                            </template>

                            <template v-slot:body-cell-quantity="props">
                              <q-td :props="props" width="200">
                                <q-input v-model.number="props.row.quantity" input-class="text-right" type="number" outlined dense borderless />
                              </q-td>
                            </template>

                            <template v-slot:body-cell-currency="props">
                              <q-td :props="props" width="100" class="text-center">
                                {{ props.row.currency }}
                              </q-td>
                            </template>

                            <template v-slot:body-cell-total="props">
                              <q-td :props="props" width="200" outlined>
                                {{ (props.row.rate * props.row.quantity) || 0 }}
                              </q-td>
                            </template>

                            <template v-slot:body-cell-actions="props">
                              <q-td :props="props" class="text-center" width="50">
                                <q-btn flat round icon="delete" color="red" @click="removeRow(props.row.id)" />
                              </q-td>
                            </template>
                          </q-table>
                          <div class="flex justify-between">
                            <div class="q-mt-md">
                              <q-btn label="Add Row" icon="add" color="primary" @click="addRow" />
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
                      Delivery Schedule and Payment Terms
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Delivery Schedule " />

                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Payment Terms" />
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

<script setup>
  import { ref } from 'vue';
  const ProposalType = ['New Business', 'Existing', 'Upsell'];
  const Priority = ['High', 'Medium', 'Low'];
  const ProductTypes = ['Data Feed', 'Terminal'];
  const competitors = ['Microsoft', 'IBM', 'SAP', 'Salesforce', 'Oracle', 'Adobe', 'Workday', 'ServiceNow', 'Tableau', 'Zendesk'];

  const text = ref('');
  const date = ref('');
  const remarks = ref('');
  const selectedClient = ref(null);
  const selectedOpportunity = ref(null);
  const selectedProposalType = ref(null);
  const selectedCompetitor = ref(null);
  const selectedPriority = ref(null);
  const selectedProductType = ref(null);

  const onClientSelect = (client) => {
    console.log('Selected client:', client);
  };

  const onOpportunitySelect = (opportunity) => {
    console.log('Selected opportunity:', opportunity);
  };

  // --- Table Data and Configuration ---
  let nextId = 1;

  // Product options for the dropdown in the table
  const productOptions = ref(['Equity', 'Mobile', 'Money', 'Money Plus', 'General']);
  
  // Product type options for the dropdown in the table
  const productTypeOptions = ref(['Package', 'Add On', 'Other Charges']);

  const rows = ref([
    { id: nextId++, product_type:"Package", name: 'Equity', rate: 250, quantity: 2, currency: 'INR' },
    { id: nextId++, product_type:"Add On", name: 'Mobile', rate: 300, quantity: 5, currency: 'USD' },
    { id: nextId++, product_type:"Add on", name: 'Finance', rate: 400, quantity: 1, currency: 'INR' },
  ]);

  const tableColumns = [
    { name: 'product_type', label: 'Product Type', field: 'product_type', align: 'left' },  
    { name: 'name', label: 'Product', field: 'name', align: 'left' },
    { name: 'rate', label: 'Rate', field: 'rate', align: 'right' },
    { name: 'quantity', label: 'No Of Ids', field: 'quantity', align: 'right' },
    { name: 'currency', label: 'Currency', field: 'currency', align: 'center' },
    { name: 'total', label: 'Total', field: 'total', align: 'right' },
    { name: 'actions', label: '', field: 'actions', align: 'center' }
  ];

  const addRow = () => {
    // New rows will have 'name' as null initially for the q-select
    const currency = rows.value.length % 2 === 0 ? 'INR' : 'USD';
    rows.value.push({ id: nextId++, product_type: null, name: null, rate: 0, quantity: 1, currency: currency });
  };

  const removeRow = (idToRemove) => {
    rows.value = rows.value.filter(row => row.id !== idToRemove);
  };


</script>