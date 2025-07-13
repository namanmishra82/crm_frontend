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
                <q-expansion-item>
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
                        <div class="col-12 q-pt-md">
                          <div class="client-info">
                            <div class="client-details">
                              <div>Customer information</div>
                            </div>
                          </div>
                          <q-table class="my-sticky-header-table"
                                   style="max-height: 400px;"
                                   dense
                                   flat
                                   bordered
                                   :rows="rows"
                                   :columns="columns"
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

                <q-expansion-item>
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

                <q-expansion-item>
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

                <q-expansion-item>
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
                <q-expansion-item>
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
  import { useRouter } from 'vue-router'

  export default {
    name: 'AboutPage',
    setup() {
      const router = useRouter()

      const leadadd = () => {
        router.push('/LeadAdd') // This route must be defined in your router
      }

      const selected = ref([])
      const date = ref('2019/02/01')
      const model = ref(null)

      const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
       // < !--Customer information -->
      const columns = [
        { name: 'Client_Name', required: true, label: 'Client Name', align: 'left', field: row => row.Client_Name, format: val => `${val}`, sortable: true },
        { name: 'Client_Billing_Name', align: 'left', label: 'Client Billing Name', field: 'Client_Billing_Name', sortable: true },
        { name: 'Customer_Segment_1', align: 'left', label: 'Customer Segment 1', field: 'Customer_Segment_1', sortable: true },
        { name: 'Customer_Segment_2', align: 'left', label: 'Customer Segment 2', field: 'Customer_Segment_2', sortable: true },
        { name: 'Customer_Segment_3', align: 'left', label: 'Customer Segment 3', field: 'Customer_Segment_3', sortable: true },
        { name: 'Account_Type_Id', align: 'left', label: 'Account Type Id', field: 'Account_Type_Id', sortable: true },
        { name: 'Customer_Group', align: 'left', label: 'Customer Group', field: 'Customer_Group', sortable: true },
        { name: 'Listed_Company', align: 'left', label: 'Listed Company', field: 'Listed_Company', sortable: true },
        { name: 'Industry', align: 'left', label: 'Industry', field: 'Industry', sortable: true },
        { name: 'PAN_No', align: 'left', label: 'PAN No', field: 'PAN_No', sortable: true },
        { name: 'TAN_No', align: 'left', label: 'TAN No', field: 'TAN_No', sortable: true },
        { name: 'Billing_Branch', align: 'left', label: 'Billing Branch', field: 'Billing_Branch', sortable: true },
        { name: 'TDS_Rate_Applicable_S', align: 'left', label: 'TDS Rate Applicable S', field: 'TDS_Rate_Applicable_S', sortable: true },
        { name: 'Annual_Revenue', align: 'left', label: 'Annual Revenue', field: 'Annual_Revenue', sortable: true },
        { name: 'Employees', align: 'left', label: 'Employees', field: 'Employees', sortable: true },
        { name: 'Owner_Selection', align: 'left', label: 'Owner Selection', field: 'Owner_Selection', sortable: true },
        { name: 'Website', align: 'left', label: 'Website', field: 'Website', sortable: true },
        { name: 'Description', align: 'left', label: 'Description', field: 'Description', sortable: true },
        { name: 'Actions', align: 'left', label: 'Actions', field: 'Actions' }
      ]

      const rows = Array(12).fill().map(() => ({
        Client_Name: 'Acme Corp',
        Client_Billing_Name: 'Acme Billing',
        Customer_Segment_1: 'Retail',
        Customer_Segment_2: 'Online',
        Customer_Segment_3: 'Premium',
        Account_Type_Id: 'AT-001',
        Customer_Group: 'Group A',
        Listed_Company: 'Yes',
        Industry: 'Technology',
        PAN_No: 'ABCDE1234F',
        TAN_No: 'TAN1234567',
        Billing_Branch: 'Mumbai',
        TDS_Rate_Applicable_S: '10%',
        Annual_Revenue: '$5M',
        Employees: '200',
        Owner_Selection: 'John Doe',
        Website: 'www.acme.com',
        Description: 'Leading tech provider'
      }))
        //< !--close Customer information -->
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
        leadadd,
        selected,
        columns,
        rows,
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
