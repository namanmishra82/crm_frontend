<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>

  <q-card class="my-card q-ma-md">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Client Master</div>
        <q-btn color="primary text-capitalize" label="Save" icon="save" />
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
                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="info" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Customer information
                    </q-item-section>


                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>

                      <div class="row q-col-gutter-md items-center">

                        <!--   Date Picker -->
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Client Name " />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Client  Billing Name " />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label=" Customer Segment 1" />
                        </div>

                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label=" Customer Segment 2" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="options" label="Customer Segment 3" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="options" label="Account Type Id" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="options" label="Customer Group" />

                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-checkbox v-model="val" label="Listed Company" />
                        </div>


                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Industry" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="text" label="PAN No" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="text" label="TAN No" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Billing Branch" />
                        </div>
                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="TDS Rate Applicable" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="text" label="Annual Revenue" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-input dense outlined v-model="text" label="Employees" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-select dense outlined v-model="model" :options="options" label="Owner" />
                        </div>

                      </div>
                      <div class="row q-my-md q-col-gutter-md items-center">
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Website" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined type="textarea" v-model="message" placeholder="Description" rows="2" />
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
                      Customer Contact Persons
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">

                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 q-pt-md">
                          <div class="client-info">

                            <div class="client-details">
                              <div>Customer Contact Persons</div>
                            </div>
                          </div>
                          <q-table class="my-sticky-header-table"
                                   style="max-height: 400px;"
                                   dense
                                   flat
                                   bordered
                                   :rows="rows_con"
                                   :columns="columns_con"
                                   row-key="name"
                                   :loading="loading"
                                   virtual-scroll
                                   :virtual-scroll-item-size="48"
                                   :virtual-scroll-sticky-size-start="48"
                                   :pagination="pagination"
                                   :rows-per-page-options="[0]"
                                   @virtual-scroll="onScroll">
                            <template v-slot:body="props">
                              <q-tr :props="props" :class="props.rowIndex % 2 === 0 ? 'even-row' : 'odd-row'">
                                <q-td v-for="col in props.cols"
                                      :key="col.name"
                                      :props="props">
                                  <template v-if="col.name === 'Actions'">
                                    <q-btn dense flat size="10px"
                                           icon="edit"
                                           @click="editRow(props.row)" />
                                    <q-btn dense flat size="10px"
                                           icon="delete"
                                           @click="deleteRow(props.row)" />
                                    <q-btn dense flat size="10px"
                                           icon="info"
                                           @click="infoRow(props.row)" />
                                  </template>
                                  <template v-else>
                                    {{ col.value }}
                                  </template>
                                </q-td>
                              </q-tr>
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
                      Customer Address
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 q-pt-md">
                          <div class="client-info">

                            <div class="client-details">
                              <div>Customer Address</div>
                            </div>
                          </div>
                          <q-table class="my-sticky-header-table"
                                   style="max-height: 400px;"
                                   dense
                                   flat
                                   bordered
                                   :rows="rowsAdd"
                                   :columns="columnsAdd"
                                   row-key="name"
                                   :loading="loading"
                                   virtual-scroll
                                   :virtual-scroll-item-size="48"
                                   :virtual-scroll-sticky-size-start="48"
                                   :pagination="pagination"
                                   :rows-per-page-options="[0]"
                                   @virtual-scroll="onScroll">
                            <template v-slot:body="props">
                              <q-tr :props="props" :class="props.rowIndex % 2 === 0 ? 'even-row' : 'odd-row'">
                                <q-td v-for="col in props.cols"
                                      :key="col.name"
                                      :props="props">
                                  <template v-if="col.name === 'Actions'">
                                    <q-btn dense flat size="10px"
                                           icon="edit"
                                           @click="editRow(props.row)" />
                                    <q-btn dense flat size="10px"
                                           icon="delete"
                                           @click="deleteRow(props.row)" />
                                    <q-btn dense flat size="10px"
                                           icon="info"
                                           @click="infoRow(props.row)" />
                                  </template>
                                  <template v-else>
                                    {{ col.value }}
                                  </template>
                                </q-td>
                              </q-tr>
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
                      Customer PO
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 q-pt-md">
                          <div class="client-info">

                            <div class="client-details">
                              <div>Customer PO</div>
                            </div>
                          </div>
                          <q-table class="my-sticky-header-table"
                                   style="max-height: 400px;"
                                   dense
                                   flat
                                   bordered
                                   :rows="rowsPO"
                                   :columns="columnsPO"
                                   row-key="name"
                                   :loading="loading"
                                   virtual-scroll
                                   :virtual-scroll-item-size="48"
                                   :virtual-scroll-sticky-size-start="48"
                                   :pagination="pagination"
                                   :rows-per-page-options="[0]"
                                   @virtual-scroll="onScroll">
                            <template v-slot:body="props">
                              <q-tr :props="props" :class="props.rowIndex % 2 === 0 ? 'even-row' : 'odd-row'">
                                <q-td v-for="col in props.cols"
                                      :key="col.name"
                                      :props="props">
                                  <template v-if="col.name === 'Actions'">
                                    <q-btn dense flat size="10px"
                                           icon="edit"
                                           @click="editRow(props.row)" />
                                    <q-btn dense flat size="10px"
                                           icon="delete"
                                           @click="deleteRow(props.row)" />
                                    <q-btn dense flat size="10px"
                                           icon="info"
                                           @click="infoRow(props.row)" />
                                  </template>
                                  <template v-else>
                                    {{ col.value }}
                                  </template>
                                </q-td>
                              </q-tr>
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
                      Customer Documents
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">
                        <div class="col-12 q-pt-md">
                          <div class="client-info">

                            <div class="client-details">
                              <div>Customer Documents</div>
                            </div>
                          </div>
                          <q-table class="my-sticky-header-table"
                                   style="max-height: 400px;"
                                   dense
                                   flat
                                   bordered
                                   :rows="rowsDoc"
                                   :columns="columnsDoc"
                                   row-key="name"
                                   :loading="loading"
                                   virtual-scroll
                                   :virtual-scroll-item-size="48"
                                   :virtual-scroll-sticky-size-start="48"
                                   :pagination="pagination"
                                   :rows-per-page-options="[0]"
                                   @virtual-scroll="onScroll">
                            <template v-slot:body="props">
                              <q-tr :props="props" :class="props.rowIndex % 2 === 0 ? 'even-row' : 'odd-row'">
                                <q-td v-for="col in props.cols"
                                      :key="col.name"
                                      :props="props">
                                  <template v-if="col.name === 'Actions'">
                                    <q-btn dense flat size="10px"
                                           icon="edit"
                                           @click="editRow(props.row)" />
                                    <q-btn dense flat size="10px"
                                           icon="delete"
                                           @click="deleteRow(props.row)" />
                                    <q-btn dense flat size="10px"
                                           icon="info"
                                           @click="infoRow(props.row)" />
                                  </template>
                                  <template v-else>
                                    {{ col.value }}
                                  </template>
                                </q-td>
                              </q-tr>
                            </template>
                          </q-table>
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
    name: 'AboutPage',
    setup() {
      const selected = ref([])
      const date = ref('2019/02/01')
      const model = ref(null)
      const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
       

        
        // < !--Customer Contact Persons-- >
         const columns_con = [
        { name: 'Type_of_Contact', required: true, label: 'Type of Contact', align: 'left', field: row => row.Type_of_Contact, format: val => `${val}`, sortable: true },
        { name: 'Salutations', align: 'left', label: 'Salutations', field: 'Salutations', sortable: true },
        { name: 'First_Name', align: 'left', label: 'First Name', field: 'First_Name', sortable: true },
        { name: 'Middle_Name', align: 'left', label: 'Middle Name', field: 'Middle_Name', sortable: true },
        { name: 'Last_Name', align: 'left', label: 'Last Name', field: 'Last_Name', sortable: true },
        { name: 'Job_Title', align: 'left', label: 'Job Title', field: 'Job_Title', sortable: true },
        { name: 'Department', align: 'left', label: 'Department', field: 'Department', sortable: true },
        { name: 'Asset_Focus', align: 'left', label: 'Asset Focus', field: 'Asset_Focus', sortable: true },
        { name: 'Functions', align: 'left', label: 'Functions', field: 'Functions', sortable: true },
        { name: 'Persona', align: 'left', label: 'Persona', field: 'Persona', sortable: true },
        { name: 'Email_1', align: 'left', label: 'Email 1', field: 'Email_1', sortable: true },
        { name: 'Email_2', align: 'left', label: 'Email 2', field: 'Email_2', sortable: true },
        { name: 'Office_Contact_No', align: 'left', label: 'Office Contact No', field: 'Office_Contact_No', sortable: true },
        { name: 'Mobile', align: 'left', label: 'Mobile', field: 'Mobile', sortable: true },
        { name: 'Active', align: 'left', label: 'Active', field: 'Active', sortable: true },
        { name: 'SMS_ID', align: 'left', label: 'SMS ID', field: 'SMS_ID', sortable: true },
        { name: 'Terminal_No', align: 'left', label: 'Terminal No', field: 'Terminal_No', sortable: true },
        { name: 'Workstation_ID', align: 'left', label: 'Workstation ID', field: 'Workstation_ID', sortable: true },
           { name: 'Last_Login_Date', align: 'left', label: 'Last Login Date', field: 'Last_Login_Date', sortable: true },
           { name: 'Actions', align: 'left', label: 'Actions', field: 'Actions' }
      ]
      const rows_con = Array(12).fill().map(() => ({
        Type_of_Contact: 'Individual',
        Salutations: 'Mr.',
        First_Name: 'John',
        Middle_Name: 'W.',
        Last_Name: 'Maslor',
        Job_Title: 'Marketing Manager',
        Department: 'Sales',
        Asset_Focus: 'Web Assets',
        Functions: 'Lead Generation',
        Persona: 'Decision Maker',
        Email_1: 'john@example.com',
        Email_2: 'john.alt@example.com',
        Office_Contact_No: '022-555-1234',
        Mobile: '+91-9876543210',
        Active: 'Yes',
        SMS_ID: 'SMS123',
        Terminal_No: 'T001',
        Workstation_ID: 'WS102',
        Last_Login_Date: '2025-05-26'
      }))

        // < !--close Contact Persons-- >

      // < !--Customer Customer Address-- >
      const columnsAdd = [
        { name: 'Address_Type', required: true, label: 'Address Type', align: 'left', field: row => row.Address_Type, format: val => `${val}`, sortable: true },
        { name: 'Address_Line_1', align: 'left', label: 'Address Line 1', field: 'Address_Line_1', sortable: true },
        { name: 'Address_Line_2', align: 'left', label: 'Address Line 2', field: 'Address_Line_2', sortable: true },
        { name: 'Address_Line_3', align: 'left', label: 'Address Line 3', field: 'Address_Line_3', sortable: true },
        { name: 'Address_Line_4', align: 'left', label: 'Address Line 4', field: 'Address_Line_4', sortable: true },
        { name: 'Country', align: 'left', label: 'Country', field: 'Country', sortable: true },
        { name: 'Zone', align: 'left', label: 'Zone', field: 'Zone', sortable: true },
        { name: 'State', align: 'left', label: 'State', field: 'State', sortable: true },
        { name: 'City', align: 'left', label: 'City', field: 'City', sortable: true },
        { name: 'Pincode', align: 'left', label: 'Pincode', field: 'Pincode', sortable: true },
        { name: 'GSTIN', align: 'left', label: 'GSTIN', field: 'GSTIN', sortable: true },
        { name: 'Actions', align: 'left', label: 'Actions', field: 'Actions' }
      ]
      const rowsAdd = Array(12).fill().map(() => ({
        Address_Type: 'Office',
        Address_Line_1: '123 Business Park',
        Address_Line_2: 'Phase II',
        Address_Line_3: 'Near IT Hub',
        Address_Line_4: 'Building 4A',
        Country: 'India',
        Zone: 'West',
        State: 'Maharashtra',
        City: 'Mumbai',
        Pincode: '400001',
        GSTIN: '27ABCDE1234F1Z5'
      }))
      // < !--close Customer Address-- >
      // < !--Customer po-- >
      const columnsPO = [
        { name: 'PO_Number', required: true, label: 'PO_Number', align: 'left', field: row => row.PO_Number, format: val => `${val}`, sortable: true },
        { name: 'Valid_From', align: 'left', label: 'Valid_From', field: 'Valid_From', sortable: true },
        { name: 'Valid_Till', align: 'left', label: 'Valid_Till', field: 'Valid_Till', sortable: true },
        { name: 'Actions', align: 'left', label: 'Actions', field: 'Actions' }

      ]
      const rowsPO = Array(12).fill().map(() => ({
        PO_Number: '400001',
        Valid_From: '2025-05-26',
        Valid_Till: '2025-10-26'
      }))
      // < !--close Customer po-- >

      // < !--Customer po-- >
      const columnsDoc = [
        { name: 'Document_Type', required: true, label: 'Document Type', align: 'left', field: row => row.Document_Type, format: val => `${val}`, sortable: true },
        { name: 'Document_Name', align: 'left', label: 'Document Name', field: 'Document_Name', sortable: true },
        { name: 'Document_Format', align: 'left', label: 'Document Type', field: 'Document_Format', sortable: true },
        { name: 'Document_Size', align: 'left', label: 'Document Size', field: 'Document_Size', sortable: true },
        { name: 'Description', align: 'left', label: 'Description', field: 'Description', sortable: true },
        { name: 'Download', align: 'left', label: 'Download', field: 'Download' }
      ]
      const rowsDoc = Array(12).fill().map(() => ({
        Document_Type: 'Contract',
        Document_Name: 'Service_Agreement_2025',
        Document_Format: 'PDF',
        Document_Size: '1.2 MB',
        Description: 'Signed agreement with client',
        Download: '<a href="/files/Service_Agreement_2025.pdf" target="_blank">Download</a>'
      }))
      // < !--close Customer po-- >

      return {
         
        selected,
        
        rows_con,
        columns_con,
        rowsAdd,
        columnsAdd,
        rowsPO,
        columnsPO,
        rowsDoc,
        columnsDoc,
        date,
        model,
        options
      }
    }
  }
</script>
