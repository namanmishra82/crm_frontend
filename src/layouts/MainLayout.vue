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
              <q-item clickable v-close-popup>
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
    <q-expansion-item icon="group" label="CRM" dense default-opened>
     
      <q-item clickable v-ripple to="/Lead" class="q-pl-lg">
        <q-item-section avatar><q-icon name="layers" /></q-item-section>
        <q-item-section>Leads</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/Opportunity" class="q-pl-lg">
        <q-item-section avatar><q-icon name="online_prediction" /></q-item-section>
        <q-item-section>Opportunities</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/Proposal" class="q-pl-lg">
        <q-item-section avatar><q-icon name="flight" /></q-item-section>
        <q-item-section>Proposal</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/Smart_Login_Import" class="q-pl-lg">
        <q-item-section avatar><q-icon name="cloud_download" /></q-item-section>
        <q-item-section>Smart Login Import</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Trial_Request" class="q-pl-lg">
        <q-item-section avatar><q-icon name="person" /></q-item-section>
        <q-item-section>Trial Management</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Trial_Extend" class="q-pl-lg">
        <q-item-section avatar><q-icon name="person" /></q-item-section>
        <q-item-section>Trial Extend</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Action-Log" class="q-pl-lg">
        <q-item-section avatar><q-icon name="timeline" /></q-item-section>
        <q-item-section>Action Log</q-item-section>
      </q-item>
    </q-expansion-item>

    
    <q-expansion-item icon="assignment" label="Requests" dense >
      <q-item clickable v-ripple to="/New_Subscription" class="q-pl-lg">
        <q-item-section avatar><q-icon name="workspace_premium" /></q-item-section>
        <q-item-section>New Subscription</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/Commercial" class="q-pl-lg">
        <q-item-section avatar><q-icon name="receipt" /></q-item-section>
        <q-item-section>Change Bill Commercial</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/NonCommercial" class="q-pl-lg">
        <q-item-section avatar><q-icon name="receipt" /></q-item-section>
        <q-item-section>Change Bill Non-Commercial</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/StopBill" class="q-pl-lg">
        <q-item-section avatar><q-icon name="request_page" /></q-item-section>
        <q-item-section>Stop Bill</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/Salvage_Disconnect" class="q-pl-lg">
        <q-item-section avatar><q-icon name="call_missed_outgoing" /></q-item-section>
        <q-item-section>Salvage Disconnect</q-item-section>
      </q-item>
    </q-expansion-item>

    <q-item clickable v-ripple to="/Client_Master">
      <q-item-section avatar><q-icon name="attribution" /></q-item-section>
      <q-item-section>Accounts</q-item-section>
    </q-item>

    <q-expansion-item icon="receipt_long" label="Finance" dense >
      <q-item clickable v-ripple to="/Currency_Conversion" class="q-pl-lg">
        <q-item-section avatar><q-icon name="currency_exchange" /></q-item-section>
        <q-item-section>Currency Conversion</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Manual_Invoice" class="q-pl-lg">
        <q-item-section avatar><q-icon name="receipt" /></q-item-section>
        <q-item-section>Invoice Management</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Invoice_Generate" class="q-pl-lg">
        <q-item-section avatar><q-icon name="receipt" /></q-item-section>
        <q-item-section>Invoice Generate</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Invoice_PDF_Generate" class="q-pl-lg">
        <q-item-section avatar><q-icon name="picture_as_pdf" /></q-item-section>
        <q-item-section>Invoice PDF Generate</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Subscriber_Mapping" class="q-pl-lg">
        <q-item-section avatar><q-icon name="hub" /></q-item-section>
        <q-item-section>Subscriber Mapping</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Start_Bill_Invoice" class="q-pl-lg">
        <q-item-section avatar><q-icon name="play_arrow" /></q-item-section>
        <q-item-section>Start Bill Invoice</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Stop_Bill_Generate" class="q-pl-lg">
        <q-item-section avatar><q-icon name="stop" /></q-item-section>
        <q-item-section>Stop Bill Invoice</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Change_Bill_Commercial" class="q-pl-lg">
        <q-item-section avatar><q-icon name="receipt" /></q-item-section>
        <q-item-section>Change Bill Commercial Generate</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Change_Bill_NonCommercial" class="q-pl-lg">
        <q-item-section avatar><q-icon name="receipt" /></q-item-section>
        <q-item-section>Change Bill Non-Commercial Generate</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Debit_Credit_Note" class="q-pl-lg">
        <q-item-section avatar><q-icon name="swap_horiz" /></q-item-section>
        <q-item-section>Debit Note / Credit Note</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/GST_JSON_Generate" class="q-pl-lg">
        <q-item-section avatar><q-icon name="data_object" /></q-item-section>
        <q-item-section>Generate GST JSON</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/GST_Upload_Ack" class="q-pl-lg">
        <q-item-section avatar><q-icon name="cloud_upload" /></q-item-section>
        <q-item-section>GST Acknowledgement Upload</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/TDS_Management" class="q-pl-lg">
        <q-item-section avatar><q-icon name="percent" /></q-item-section>
        <q-item-section>TDS Management</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/Invoice_Other" class="q-pl-lg">
        <q-item-section avatar><q-icon name="delete_sweep" /></q-item-section>
        <q-item-section>Invoice Other</q-item-section>
      </q-item>
    </q-expansion-item>

    <q-expansion-item icon="payments" label="Payments" dense >
      <q-item clickable v-ripple to="/Payments" class="q-pl-lg">
        <q-item-section avatar><q-icon name="account_balance" /></q-item-section>
        <q-item-section>Payment Receipt</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/TallyExport" class="q-pl-lg">
        <q-item-section avatar><q-icon name="file_upload" /></q-item-section>
        <q-item-section>Export to Tally</q-item-section>
      </q-item>
    </q-expansion-item>

    <q-expansion-item icon="bar_chart" label="Reports" dense >
      <q-item clickable v-ripple to="/SalesRegister" class="q-pl-lg">
        <q-item-section>Sales Register</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/SalesRegisterIDWise" class="q-pl-lg">
        <q-item-section>Sales Register (ID wise)</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/PriceTracker" class="q-pl-lg">
        <q-item-section>Price Change Tracker</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/SubscriptionTracker" class="q-pl-lg">
        <q-item-section>Subscription Tracker</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/BilledRevenue" class="q-pl-lg">
        <q-item-section>Billed Revenue Report</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/UnbilledRevenue" class="q-pl-lg">
        <q-item-section>Unbilled Revenue Report</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/InvoiceBifurcation" class="q-pl-lg">
        <q-item-section>Invoice Bifurcation</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/PendingReport" class="q-pl-lg">
        <q-item-section>Pending Report</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/CollectionReport" class="q-pl-lg">
        <q-item-section>Collection Report</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/PendingBucket" class="q-pl-lg">
        <q-item-section>Pending Bucket</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/CustomerSegments" class="q-pl-lg">
        <q-item-section>Customer Segmentations</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/SubscribersExport" class="q-pl-lg">
        <q-item-section>Subscribers Export</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/InvoiceExport" class="q-pl-lg">
        <q-item-section>Invoice Export</q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/AuditReports" class="q-pl-lg">
        <q-item-section>Audit Reports</q-item-section>
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
  export default {
    name: 'MainLayout',
    data() {
      return {
        leftDrawerOpen: false
      }
    }
  }
</script>
<style scoped>
  .q-expansion-item .q-item {
    padding-left: 28px;
  }

</style>
