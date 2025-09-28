<template>
  <q-layout view="lHh Lpr lFf">

    <!-- Top App Bar -->
    <q-header>
      <q-toolbar>
        <!-- hamburger -->
        <q-btn class="bg-white" flat dense icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" />
        <!-- Close hamburger -->
        <!-- Search -->
        <q-input dense
                 debounce="500"
                 v-model="search"
                 placeholder="Search..."
                 outlined
                 clearable
                 class="ellipsis q-ml-sm bg-white q-mx-xs"
                 style="width: 450px">

          <template v-slot:append>
            <q-icon name="search" icon-left="cancel" />
          </template>
        </q-input>
        <!-- Right Side Icons -->
        <q-space />
        <q-btn flat dense icon="notifications" class="q-mx-md bg-white">
          <q-badge rounded color="red" floating>3</q-badge>
        </q-btn>

        <q-btn flat dense icon="settings" class="q-mx-xs bg-white" />

        <!-- Avatar with Menu -->
        <div class="row items-center cursor-pointer q-gutter-sm q-mx-xs" @click="menu = true">
          <!-- Avatar with fixed size -->
          <q-avatar size="30px">
            <q-img src="https://i.pravatar.cc/40" />
          </q-avatar>

          <!-- Username and arrow -->
          <div class="row items-center q-gutter-xs">
            <span class="text-weight-medium">Satish Singh</span>
            <q-icon name="arrow_drop_down" />
          </div>

          <!-- Dropdown menu -->
          <q-menu v-model="menu" anchor="bottom right" self="top right">
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Left Side Drawer --><q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="250">
  <q-list padding>
    <q-item>
      <img alt="logo" src="~assets/logo.png" style="width: 150px; height: auto">
    </q-item>
    <q-item>
      <q-input dense outlined v-model="text" label="Search Menu" style="width:100%;" />
    </q-item>
    <q-expansion-item icon="business_center" label="CRM" dense default-opened>
     
      <q-item clickable v-ripple to="/app/Lead" class="q-pl-lg">
        <q-item-section avatar><q-icon name="person_search" /></q-item-section>
        <q-item-section>Leads</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/app/Opportunity" class="q-pl-lg">
        <q-item-section avatar><q-icon name="trending_up" /></q-item-section>
        <q-item-section>Opportunities</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/app/Proposal" class="q-pl-lg">
        <q-item-section avatar><q-icon name="description" /></q-item-section>
        <q-item-section>Proposal</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/app/Subscription" class="q-pl-lg">
        <q-item-section avatar><q-icon name="card_membership" /></q-item-section>
        <q-item-section>Subscription Form</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/app/Smart_Login_Import" class="q-pl-lg">
        <q-item-section avatar><q-icon name="cloud_download" /></q-item-section>
        <q-item-section>Smart Login Import</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Trial_Request" class="q-pl-lg">
        <q-item-section avatar><q-icon name="free_breakfast" /></q-item-section>
        <q-item-section>Trial Management</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Trial_Extend" class="q-pl-lg">
        <q-item-section avatar><q-icon name="schedule" /></q-item-section>
        <q-item-section>Trial Extend</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Action_Log" class="q-pl-lg">
        <q-item-section avatar><q-icon name="history" /></q-item-section>
        <q-item-section>Action Log</q-item-section>
      </q-item>
    </q-expansion-item>

    
    <q-expansion-item icon="request_quote" label="Requests" dense >
      <q-item clickable v-ripple to="/app/New_Subscription" class="q-pl-lg">
        <q-item-section avatar><q-icon name="add_circle" /></q-item-section>
        <q-item-section>New Subscription</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/app/Commercial" class="q-pl-lg">
        <q-item-section avatar><q-icon name="business" /></q-item-section>
        <q-item-section>Change Bill Commercial</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/app/NonCommercial" class="q-pl-lg">
        <q-item-section avatar><q-icon name="home" /></q-item-section>
        <q-item-section>Change Bill Non-Commercial</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/app/StopBill" class="q-pl-lg">
        <q-item-section avatar><q-icon name="stop_circle" /></q-item-section>
        <q-item-section>Stop Bill</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/app/Salvage_Disconnect" class="q-pl-lg">
        <q-item-section avatar><q-icon name="power_off" /></q-item-section>
        <q-item-section>Salvage Disconnect</q-item-section>
      </q-item>
    </q-expansion-item>

    <q-item clickable v-ripple to="/app/Client_Master">
      <q-item-section avatar><q-icon name="account_circle" /></q-item-section>
      <q-item-section>Accounts</q-item-section>
    </q-item>

    <q-expansion-item icon="account_balance_wallet" label="Finance" dense >
      <q-item clickable v-ripple to="/app/Currency_Conversion" class="q-pl-lg">
        <q-item-section avatar><q-icon name="currency_exchange" /></q-item-section>
        <q-item-section>Currency Conversion</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Manual_Invoice" class="q-pl-lg">
        <q-item-section avatar><q-icon name="receipt" /></q-item-section>
        <q-item-section>Invoice Management</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Invoice_Generate" class="q-pl-lg">
        <q-item-section avatar><q-icon name="receipt" /></q-item-section>
        <q-item-section>Invoice Generate</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Invoice_PDF_Generate" class="q-pl-lg">
        <q-item-section avatar><q-icon name="picture_as_pdf" /></q-item-section>
        <q-item-section>Invoice PDF Generate</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Subscriber_Mapping" class="q-pl-lg">
        <q-item-section avatar><q-icon name="hub" /></q-item-section>
        <q-item-section>Subscriber Mapping</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/StartBill" class="q-pl-lg">
        <q-item-section avatar><q-icon name="play_arrow" /></q-item-section>
        <q-item-section>Start Bill Invoice</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Stop_Bill_Generate" class="q-pl-lg">
        <q-item-section avatar><q-icon name="stop" /></q-item-section>
        <q-item-section>Stop Bill Invoice</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Change_Bill_Commercial" class="q-pl-lg">
        <q-item-section avatar><q-icon name="receipt" /></q-item-section>
        <q-item-section>Change Bill Commercial Generate</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Change_Bill_NonCommercial" class="q-pl-lg">
        <q-item-section avatar><q-icon name="receipt" /></q-item-section>
        <q-item-section>Change Bill Non-Commercial Generate</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Debit_Credit_Note" class="q-pl-lg">
        <q-item-section avatar><q-icon name="swap_horiz" /></q-item-section>
        <q-item-section>Debit Note / Credit Note</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/GST_JSON_Generate" class="q-pl-lg">
        <q-item-section avatar><q-icon name="data_object" /></q-item-section>
        <q-item-section>Generate GST JSON</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/GST_Upload_Ack" class="q-pl-lg">
        <q-item-section avatar><q-icon name="cloud_upload" /></q-item-section>
        <q-item-section>GST Acknowledgement Upload</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/TDS_Management" class="q-pl-lg">
        <q-item-section avatar><q-icon name="percent" /></q-item-section>
        <q-item-section>TDS Management</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Invoice_Other" class="q-pl-lg">
        <q-item-section avatar><q-icon name="delete_sweep" /></q-item-section>
        <q-item-section>Invoice Other</q-item-section>
      </q-item>
    </q-expansion-item>

    <q-expansion-item icon="payment" label="Payments" dense >
      <q-item clickable v-ripple to="/app/Payments" class="q-pl-lg">
        <q-item-section avatar><q-icon name="account_balance" /></q-item-section>
        <q-item-section>Payment Receipt</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/TallyExport" class="q-pl-lg">
        <q-item-section avatar><q-icon name="file_upload" /></q-item-section>
        <q-item-section>Export to Tally</q-item-section>
      </q-item>
    </q-expansion-item>

    <q-expansion-item icon="analytics" label="Reports" dense >
      <q-item clickable v-ripple to="/app/SalesRegister" class="q-pl-lg">
        <q-item-section>Sales Register</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/SalesRegisterIDWise" class="q-pl-lg">
        <q-item-section>Sales Register (ID wise)</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/PriceTracker" class="q-pl-lg">
        <q-item-section>Price Change Tracker</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/SubscriptionTracker" class="q-pl-lg">
        <q-item-section>Subscription Tracker</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/BilledRevenue" class="q-pl-lg">
        <q-item-section>Billed Revenue Report</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/UnbilledRevenue" class="q-pl-lg">
        <q-item-section>Unbilled Revenue Report</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/InvoiceBifurcation" class="q-pl-lg">
        <q-item-section>Invoice Bifurcation</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/PendingReport" class="q-pl-lg">
        <q-item-section>Pending Report</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/CollectionReport" class="q-pl-lg">
        <q-item-section>Collection Report</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/PendingBucket" class="q-pl-lg">
        <q-item-section>Pending Bucket</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/CustomerSegments" class="q-pl-lg">
        <q-item-section>Customer Segmentations</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/SubscribersExport" class="q-pl-lg">
        <q-item-section>Subscribers Export</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/InvoiceExport" class="q-pl-lg">
        <q-item-section>Invoice Export</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/AuditReports" class="q-pl-lg">
        <q-item-section>Audit Reports</q-item-section>
      </q-item>
    </q-expansion-item>

    <q-expansion-item icon="shield" label="Security" dense >
      <q-item clickable v-ripple to="/app/UserGroups" class="q-pl-lg">
        <q-item-section avatar><q-icon name="group" /></q-item-section>
        <q-item-section>User Groups</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/app/Users" class="q-pl-lg">
        <q-item-section avatar><q-icon name="person" /></q-item-section>
        <q-item-section>Users</q-item-section>
      </q-item>
    </q-expansion-item>
  </q-list>
</q-drawer>
    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

export default {
  name: 'MainLayout',
  setup() {
    const router = useRouter()
    const $q = useQuasar()

    const logout = () => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('device_id')
      $q.notify({
        type: 'positive',
        message: 'Logged out successfully'
      })
      router.push('/login')
    }

    return {
      logout
    }
  },
  data() {
    return {
      leftDrawerOpen: false,
      search: '',
      text: '',
      menu: false
    }
  }
}
</script>
<style scoped>
  .q-expansion-item .q-item {
    padding-left: 28px;
  }

</style>
