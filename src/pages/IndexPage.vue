<template>
  <q-page class="q-pa-lg q-mt-md">
    <q-tabs v-model="activeTab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify">
      <q-tab name="sales-revenue" label="Sales Revenue" />
      <q-tab name="sales-action" label="Sales Action" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="activeTab" animated>
      <!-- Sales Revenue Tab -->
      <q-tab-panel name="sales-revenue">
        <!-- First Row: 3 Cards -->
        <div class="row q-col-gutter-lg">
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
            <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
              <q-card-section class="q-pb-none">
                <div class="row items-center justify-between">
                  <div class="text-h6">Bar Chart</div>
                </div>
               </q-card-section>
              <q-separator dark inset />
              <q-card-section class="q-pa-md">
                <BarChart />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
            <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
              <q-card-section class="q-pb-none">
                <div class="row items-center justify-between">
                  <div class="text-h6">Pie Chart</div>
                </div>
              </q-card-section>
              <q-separator dark inset />
              <q-card-section class="q-pa-md">
                <PieChart />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
            <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
              <q-card-section class="q-pb-none">
                <div class="row items-center justify-between">
                  <div class="text-h6">Radar Chart</div>
                </div>
              </q-card-section>
              <q-separator dark inset />
              <q-card-section class="q-pa-md">
                <RadarChart />
              </q-card-section>
            </q-card>
          </div>
        </div>
        <br />
        <div class="row q-col-gutter-lg">
          <div class="col-lg-6 col-md-4 col-sm-12 col-xs-12 ">
            <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
              <q-card-section class="q-pb-none">
                <div class="row items-center justify-between">
                  <div class="text-h6">Line Chart</div>
                </div>
              </q-card-section>
              <q-separator dark inset />
              <q-card-section class="q-pa-md">
                <LineChart />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-6 col-md-4 col-sm-12 col-xs-12 ">
            <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
              <q-card-section class="q-pb-none">
                <div class="row items-center justify-between">
                  <div class="text-h6">Scatter Chart</div>
                </div>
              </q-card-section>
              <q-separator dark inset />
              <q-card-section class="q-pa-md">
                <ScatterChart />
              </q-card-section>
            </q-card>
          </div>
        </div>
        <br />
        <!-- Second Row: 2 Cards -->
        <div class="row q-col-gutter-lg">
          <div class="col-lg-12 col-md-4 col-sm-12 col-xs-12 ">
            <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
              <q-card-section class="q-pb-none">
                <div class="row items-center justify-between">
                  <div class="text-h6">Sales Chart</div>
                </div>
              </q-card-section>
              <q-separator dark inset />
              <q-card-section class="q-pa-md">
                <SalesChart />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <!-- Sales Action Tab -->
      <q-tab-panel name="sales-action">
        <div class="row q-col-gutter-lg">
          <!-- Leads Table -->
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
              <q-card-section class="q-pb-none">
                <div class="row items-center justify-between">
                  <div class="text-h6">Leads</div>
                </div>
              </q-card-section>
              <q-separator dark inset />
              <q-card-section class="q-pa-md">
                <q-table :rows="leadsData" :columns="leadsColumns" row-key="id" flat bordered :pagination="{ rowsPerPage: 5 }">
                  <template v-slot:body-cell-status="props">
                    <q-td :props="props">
                      <q-select v-model="props.row.status" :options="leadStatusOptions" dense borderless @update:model-value="updateLeadStatus(props.row.id, $event)" />
                    </q-td>
                  </template>
                  <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="text-center">
                      <q-btn flat round icon="add" color="primary" @click="addActivity(props.row, 'lead')" size="sm" />
                      <q-btn flat round icon="edit" color="secondary" @click="navigateToLead()" size="sm" />
                    </q-td>
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
          </div>

          <!-- Opportunities Table -->
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
              <q-card-section class="q-pb-none">
                <div class="row items-center justify-between">
                  <div class="text-h6">Opportunities</div>
                </div>
              </q-card-section>
              <q-separator dark inset />
              <q-card-section class="q-pa-md">
                <q-table :rows="opportunitiesData" :columns="opportunitiesColumns" row-key="id" flat bordered :pagination="{ rowsPerPage: 5 }">
                  <template v-slot:body-cell-stage="props">
                    <q-td :props="props">
                      <q-select v-model="props.row.stage" :options="opportunityStageOptions" dense borderless @update:model-value="updateOpportunityStage(props.row.id, $event)" />
                    </q-td>
                  </template>
                  <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="text-center">
                      <q-btn flat round icon="add" color="primary" @click="addActivity(props.row, 'opportunity')" size="sm" />
                      <q-btn flat round icon="edit" color="secondary" @click="navigateToOpportunity()" size="sm" />
                    </q-td>
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <br />

        <div class="row q-col-gutter-lg">
          <!-- Proposals Table -->
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
              <q-card-section class="q-pb-none">
                <div class="row items-center justify-between">
                  <div class="text-h6">Proposals</div>
                </div>
              </q-card-section>
              <q-separator dark inset />
              <q-card-section class="q-pa-md">
                <q-table :rows="proposalsData" :columns="proposalsColumns" row-key="id" flat bordered :pagination="{ rowsPerPage: 5 }" @row-click="navigateToProposal" class="cursor-pointer" />
              </q-card-section>
            </q-card>
          </div>

          <!-- Today's Tasks Table -->
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
              <q-card-section class="q-pb-none">
                <div class="row items-center justify-between">
                  <div class="text-h6">Today's Tasks</div>
                </div>
              </q-card-section>
              <q-separator dark inset />
              <q-card-section class="q-pa-md">
                <q-table :rows="tasksData" :columns="tasksColumns" row-key="id" flat bordered :pagination="{ rowsPerPage: 5 }" @row-click="navigateToTask" class="cursor-pointer" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>



<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import BarChart from 'src/components/BarChart.vue'
  import PieChart from 'src/components/PieChart.vue'
  import RadarChart from 'src/components/RadarChart.vue'
  import LineChart from 'src/components/LineChart.vue'
  import ScatterChart from 'src/components/ScatterChart.vue'
  import SalesChart from 'src/components/SalesChart.vue'

  const router = useRouter()

  const activeTab = ref('sales-revenue')

  // Status options
  const leadStatusOptions = ['New', 'Contacted', 'Qualified', 'Nurturing', 'Disqualified', 'Converted']
  const opportunityStageOptions = ['Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']

  // Sample data for tables
  const leadsData = ref([
    { id: 1, name: 'John Doe', company: 'Acme Inc', status: 'New', priority: 'High' },
    { id: 2, name: 'Jane Smith', company: 'Tech Corp', status: 'Contacted', priority: 'Medium' },
    { id: 3, name: 'Bob Johnson', company: 'Global Ltd', status: 'Qualified', priority: 'Low' }
  ])

  const opportunitiesData = ref([
    { id: 1, name: 'Software License', account: 'Acme Inc', value: 50000, stage: 'Proposal' },
    { id: 2, name: 'Hardware Upgrade', account: 'Tech Corp', value: 25000, stage: 'Negotiation' },
    { id: 3, name: 'Consulting Services', account: 'Global Ltd', value: 75000, stage: 'Qualified' }
  ])

  const proposalsData = ref([
    { id: 1, title: 'Q1 Software Package', client: 'Acme Inc', amount: 45000, status: 'Sent' },
    { id: 2, title: 'Infrastructure Setup', client: 'Tech Corp', amount: 30000, status: 'Draft' },
    { id: 3, title: 'Annual Support', client: 'Global Ltd', amount: 15000, status: 'Approved' }
  ])

  const tasksData = ref([
    { id: 1, task: 'Follow up with John Doe', type: 'Call', time: '10:00 AM', priority: 'High' },
    { id: 2, task: 'Send proposal to Tech Corp', type: 'Email', time: '2:00 PM', priority: 'Medium' },
    { id: 3, task: 'Demo presentation', type: 'Meeting', time: '4:00 PM', priority: 'High' }
  ])

  // Table columns
  const leadsColumns = [
    { name: 'name', label: 'Name', field: 'name', align: 'left' },
    { name: 'company', label: 'Company', field: 'company', align: 'left' },
    { name: 'status', label: 'Status', field: 'status', align: 'center' },
    { name: 'priority', label: 'Priority', field: 'priority', align: 'center' },
    { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
  ]

  const opportunitiesColumns = [
    { name: 'name', label: 'Opportunity', field: 'name', align: 'left' },
    { name: 'account', label: 'Account', field: 'account', align: 'left' },
    { name: 'value', label: 'Value', field: 'value', align: 'right', format: val => `$${val.toLocaleString()}` },
    { name: 'stage', label: 'Stage', field: 'stage', align: 'center' },
    { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
  ]

  const proposalsColumns = [
    { name: 'title', label: 'Proposal', field: 'title', align: 'left' },
    { name: 'client', label: 'Client', field: 'client', align: 'left' },
    { name: 'amount', label: 'Amount', field: 'amount', align: 'right', format: val => `$${val.toLocaleString()}` },
    { name: 'status', label: 'Status', field: 'status', align: 'center' }
  ]

  const tasksColumns = [
    { name: 'task', label: 'Task', field: 'task', align: 'left' },
    { name: 'type', label: 'Type', field: 'type', align: 'center' },
    { name: 'time', label: 'Time', field: 'time', align: 'center' },
    { name: 'priority', label: 'Priority', field: 'priority', align: 'center' }
  ]

  // Navigation methods
  const navigateToLead = () => {
    router.push('/leadEdit')
  }

  const navigateToOpportunity = () => {
    router.push('/OpportunityEdit')
  }

  const navigateToProposal = () => {
    router.push('/ProposalAdd')
  }

  const navigateToTask = () => {
    router.push('/Action_LogAdd')
  }

  // Activity and status management
  const addActivity = () => {
    router.push('/Action_LogAdd')
  }

  const updateLeadStatus = (id, newStatus) => {
    console.log(`Lead ${id} status updated to: ${newStatus}`)
  }

  const updateOpportunityStage = (id, newStage) => {
    console.log(`Opportunity ${id} stage updated to: ${newStage}`)
  }
</script>

