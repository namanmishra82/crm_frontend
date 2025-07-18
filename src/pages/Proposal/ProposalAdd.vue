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
                          <ClientSearchSelect
                            label="Search Account"
                            v-model="selectedClient"
                            @select="onClientSelect"
                          />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="text" label="Proposal No" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <OpportunitySearchSelect
                            label="Search Opportunity"
                            v-model="selectedOpportunity"
                            @select="onOpportunitySelect"
                          />
                        </div>

                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="ProposalType" label="Proposal Type" />
                        </div>

                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="options" label="Select Competitor to be Replaced " />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="Priority" label="Select Priority" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="date" mask="date" :rules="['date']" label="Proposal Start Date" :hide-bottom-space="true">
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
                      Proposal Value
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">

                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-12">
                          <q-page>

                            <q-table :rows="rows"
                                     :columns="tableColumns"
                                     row-key="id" flat
                                     bordered>
                              <template v-slot:body-cell-rate="props">
                                <q-td :props="props">
                                  <q-input v-model.number="props.row.rate" type="number" dense borderless />
                                </q-td>
                              </template>

                              <template v-slot:body-cell-quantity="props">
                                <q-td :props="props">
                                  <q-input v-model.number="props.row.quantity" type="number" dense borderless />
                                </q-td>
                              </template>

                              <template v-slot:body-cell-total="props">
                                <q-td :props="props">
                                  {{ (props.row.rate * props.row.quantity) || 0 }}
                                </q-td>
                              </template>

                              <template v-slot:body-cell-actions="props">
                                <q-td :props="props" class="text-center">
                                  <q-btn flat round icon="delete" color="red" @click="removeRow(props.row.id)" />
                                </q-td>
                              </template>
                            </q-table>

                            <div class="q-mt-md">
                              <q-btn label="Add Row" icon="add" color="primary" @click="addRow" />
                            </div>

                            <div class="q-mt-md text-right">
                              <div>Subtotal: <strong>{{ subtotal.toFixed(2) }}</strong></div>
                              <div>Tax (18%): <strong>{{ tax }}</strong></div>
                              <div>Grand Total: <strong>{{ grandTotal }}</strong></div>
                            </div>
                          </q-page>

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

                  <q-card class="q-pa-md" style="max-height: 400px; overflow-y: auto;">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Select Terms and conditions " />
                        </div>
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

              </q-list>
            </div>
          </div>
        </div>

      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
/* eslint-disable vue/multi-word-component-names */
  import { ref, computed } from 'vue';

  const ProposalType = ['New Business', 'Existing', 'Upsell'];

  const Priority = ['High', 'Medium', 'Low'];
  const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];

  const text = ref('');
  const model = ref(null);
  const date = ref('');
  
  // Client and opportunity data
  const selectedClient = ref(null);
  const selectedOpportunity = ref(null);
  
  const onClientSelect = (client) => {
    console.log('Selected client:', client);
  };
  
  const onOpportunitySelect = (opportunity) => {
    console.log('Selected opportunity:', opportunity);
  };

  // --- Table Data and Configuration ---
  let nextId = 1;

  const rows = ref([
    { id: nextId++, name: 'MSOffice', rate: 250, quantity: 2 },
    { id: nextId++, name: 'XP', rate: 300, quantity: 5 },
    { id: nextId++, name: 'Linux', rate: 400, quantity: 1 },
  ]);

  const tableColumns = [
    { name: 'name', label: 'Product', field: 'name', align: 'left' },
    { name: 'rate', label: 'Rate', field: 'rate', align: 'right' },
    { name: 'quantity', label: 'No Of Ids', field: 'quantity', align: 'right' },
    { name: 'total', label: 'Total', field: 'total', align: 'right' },
    { name: 'actions', label: '', field: 'actions', align: 'center' }
  ];

  const addRow = () => {
    rows.value.push({ id: nextId++, name: 'New Product', rate: 0, quantity: 1 });
  };

  const removeRow = (idToRemove) => {
    rows.value = rows.value.filter(row => row.id !== idToRemove);
  };

  const subtotal = computed(() =>
    rows.value.reduce((acc, row) => acc + (parseFloat(row.rate || 0) * parseFloat(row.quantity || 0)), 0)
  );

  const tax = computed(() => (subtotal.value * 0.18).toFixed(2));
  const grandTotal = computed(() => (subtotal.value + parseFloat(tax.value)).toFixed(2));
</script>