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

    <!-- Left Side Drawer -->
    <q-drawer v-model="leftDrawerOpen"
              show-if-above
              bordered
              :width="250">
      <q-list padding>
        <!-- This is logo section -->
        <q-item>
          <img alt="logo"
               src="~assets/logo.png"
               style="width: 150px; height: auto">

        </q-item>
        <!-- Close -->
        <!-- This is an Dashboard link -->
        <div class="mind-area">
          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="grid_view" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>
          <!-- Close -->
          
          <!-- This is an Lead link -->
          <q-item clickable v-ripple to="/Lead">
            <q-item-section avatar>
              <q-icon name="layers" />
            </q-item-section>
            <q-item-section>Lead Management </q-item-section>
          </q-item>
          <!-- Lead Close -->
          <!-- This is an Opportunity link -->
          <q-item clickable v-ripple to="/Opportunity">
            <q-item-section avatar>
              <q-icon name="online_prediction" />
            </q-item-section>
            <q-item-section>Opportunity Management </q-item-section>
          </q-item>
          <!-- Opportunity Close -->
          <!-- This is an Proposal link -->
          <q-item clickable v-ripple to="/Proposal">
            <q-item-section avatar>
              <q-icon name="flight" />
            </q-item-section>
            <q-item-section>Proposal</q-item-section>
          </q-item>
          <q-expansion-item icon="science"
                            label="Trial"
                            dense
                            expand-separator>
            <q-item clickable v-ripple to="/Trial_Request">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>Trial Request</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Trial_Extend">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>Trial Extend</q-item-section>
            </q-item>
          </q-expansion-item>
          <q-item clickable v-ripple to="/New_Subscription">
            <q-item-section avatar>
              <q-icon name="workspace_premium" />
            </q-item-section>
            <q-item-section>New Subscription </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/Salvage_Disconnect">
            <q-item-section avatar>
              <q-icon name="call_missed_outgoing" />
            </q-item-section>
            <q-item-section>Salvage Disconnect </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/Currency_Conversion">
            <q-item-section avatar>
              <q-icon name="currency_exchange" />
            </q-item-section>
            <q-item-section>Currency Conversion </q-item-section>
          </q-item>
          <q-expansion-item icon="science"
                            label="Invoice"
                            dense
                            expand-separator>
            <q-item clickable v-ripple to="/Manual_Invoice">
              <q-item-section> Manual Invoice</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/Currency_Conversion">
              <q-item-section>Currency Conversion</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Invoice_Generate">
              <q-item-section>Invoice Generate</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Invoice_PDF_Generate">
              <q-item-section>Invoice PDF Generate</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Subscriber_Mapping">
              <q-item-section>Subscriber Mapping</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Start_Bill_Invoice">
              <q-item-section>Start Bill Invoice Generate</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Stop_Bill_Generate">
              <q-item-section>Stop Bill Generate</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Change_Bill_Commercial">
              <q-item-section>Change Bill Commercial Generate</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Change_Bill_NonCommercial">
              <q-item-section>Change Bill Non-Commercial Generate</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Manual_Invoice">
              <q-item-section>Debit Note / Credit Note / Manual Invoice</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/GST_JSON_Generate">
              <q-item-section>Generate GST Json</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/GST_Upload_Ack">
              <q-item-section>GST Upload Acknowledgement</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/TDS_Management">
              <q-item-section>TDS Management</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Invoice_Other">
              <q-item-section>Invoice Other (Asset sale / scrape)</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Invoice_Email">
              <q-item-section>Invoice email to AM / customer</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Update_PO">
              <q-item-section>Option to Update PO Number and validity</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Manage_Notes">
              <q-item-section>Option to manage invoice notes</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Invoice_Letterhead">
              <q-item-section>Option to generate invoice with or without letter head</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Invoice_Annexure">
              <q-item-section>Invoice Annexure</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Change_Invoice_Format">
              <q-item-section>Change invoice no format</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Selective_Generation">
              <q-item-section>Selective invoice generation</q-item-section>
            </q-item>
          </q-expansion-item>

          
          <q-item clickable v-ripple to="/Smart-Login-Import">
            <q-item-section avatar>
              <q-icon name="cloud_download" />
            </q-item-section>
            <q-item-section>Smart Login Import</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/Action-Log">
            <q-item-section avatar>
              <q-icon name="timeline" />
            </q-item-section>
            <q-item-section> Daily Activity Tracking </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/StopBill">
            <q-item-section avatar>
              <q-icon name="request_page" />
            </q-item-section>
            <q-item-section> Stop Bill </q-item-section>
          </q-item>
          <!-- Opportunity Close -->
          <!-- This is an User link -->
          <q-expansion-item icon="receipt"
                            label="Change Bill"
                            dense
                            expand-separator>
            <q-item clickable v-ripple to="/Commercial">
              <q-item-section avatar>
                <q-icon name="person"/>
              </q-item-section>
              <q-item-section>Commercial</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/NonCommercial">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>Non-Commercial</q-item-section>
            </q-item>
          </q-expansion-item>
          <!-- User Close -->
          <q-item clickable v-ripple to="/Client_Master">
            <q-item-section avatar>
              <q-icon name="attribution" />
            </q-item-section>
            <q-item-section>Client Master</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/Payments">
            <q-item-section avatar>
              <q-icon name="account_balance" />
            </q-item-section>
            <q-item-section>Payments</q-item-section>
          </q-item>
          <!-- This is an Field link -->
          <q-item clickable v-ripple to="/Approvals">
            <q-item-section avatar>
              <q-icon name="check_circle" />
            </q-item-section>
            <q-item-section>Approvals</q-item-section>
          </q-item>
          <!-- Field Close -->
          <!-- This is an Field link -->
          <q-item clickable v-ripple to="/Email-Template ">
            <q-item-section avatar>
              <q-icon name="mail" />
            </q-item-section>
            <q-item-section> Email Template </q-item-section>
          </q-item>
          <!-- Field Close -->
          <!-- This is an Field link -->
          <q-item clickable v-ripple to="/Reports">
            <q-item-section avatar>
              <q-icon name="bar_chart" />
            </q-item-section>
            <q-item-section>Reports</q-item-section>
          </q-item>
        </div>
        <!-- Field Close -->
        <!-- This is an support link -->
        <!--<q-item class="support">

          <img alt="support"
               src="~assets/support.svg"
               style="width: 200px; height: 200px">
          <q-btn color="primary text-capitalize postion" label="Support" icon="chat" />
        </q-item>-->
        <!-- Field Close -->
        <!-- This is an logout link -->
        <!--<q-item clickable v-ripple to="/login">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>-->
        <!-- Logout Close -->
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
