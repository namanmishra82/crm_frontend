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
            <q-item-section>Lead</q-item-section>
          </q-item>
          <!-- Lead Close -->
          <!-- This is an Opportunity link -->
          <q-item clickable v-ripple to="/Opportunity">
            <q-item-section avatar>
              <q-icon name="online_prediction" />
            </q-item-section>
            <q-item-section>Opportunity</q-item-section>
          </q-item>
          <!-- Opportunity Close -->
          <!-- This is an Proposal link -->
          <q-item clickable v-ripple to="/Proposal">
            <q-item-section avatar>
              <q-icon name="flight" />
            </q-item-section>
            <q-item-section>Proposal</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/Proposal">
            <q-item-section avatar>
              <q-icon name="workspace_premium" />
            </q-item-section>
            <q-item-section>New Subscription </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/Invoice">
            <q-item-section avatar>
              <q-icon name="receipt_long" />
            </q-item-section>
            <q-item-section>Invoice</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/Client-Master">
            <q-item-section avatar>
              <q-icon name="supervisor_account" />
            </q-item-section>
            <q-item-section>Client Master</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/Action-Log">
            <q-item-section avatar>
              <q-icon name="timeline" />
            </q-item-section>
            <q-item-section>Action Log</q-item-section>
          </q-item>
          <!-- Opportunity Close -->
          <!-- This is an User link -->
          <q-expansion-item icon="receipt"
                            label="Change Bill"
                            dense
                            expand-separator>
            <q-item clickable v-ripple to="/User/Profile">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>Commercial</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/User/Settings">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>Non-Commercial</q-item-section>
            </q-item>
          </q-expansion-item>
          <!-- User Close -->
          <!-- This is an Field link -->
          <q-item clickable v-ripple to="/Approvals">
            <q-item-section avatar>
              <q-icon name="check_circle" />
            </q-item-section>
            <q-item-section>Approvals</q-item-section>
          </q-item>
          <!-- Field Close -->
          <q-expansion-item icon="science"
                            label="Trial"
                            dense
                            expand-separator>
            <q-item clickable v-ripple to="/User/Profile">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>Trial Request</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/User/Settings">
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>Extend Trial</q-item-section>
            </q-item>
          </q-expansion-item>
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
