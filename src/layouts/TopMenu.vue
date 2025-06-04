<template>
  <q-layout view="hHh lpR fFf">

    <!-- Top Header -->
    <q-header elevated>
      <q-toolbar>

        <!-- Logo -->
        <q-btn flat no-caps>
          <img src="~assets/logo.png" style="height: 40px;" />
        </q-btn>
        <!--<q-input dense
                 debounce="500"
                 v-model="search"
                 placeholder="Search..."
                 outlined
                 clearable
                 class="ellipsis q-ml-sm bg-white q-mx-xs"
                 style="width: 450px">
          <template v-slot:append>
            <q-icon name="search" icon-left="cancel" />
          </template>-->
        <!--</q-input>-->
          <q-toolbar class="q-gutter-sm">

            <q-btn flat dense   label="Dashboard" to="/dashboard" />
            <q-btn flat dense   label="Lead" to="/lead" />
            <q-btn flat dense   label="Proposal" to="/proposal" />
            <q-btn flat dense  label="Opportunity" to="/Opportunity" />
            <q-btn flat dense  label="New Subscription" to="/subscription" />
            <q-btn flat dense  label="Invoice" to="/invoice" />
            <q-btn flat dense   label="Client Master" to="/client-master" />
            <q-btn flat dense   label="Action Log" to="/action-log" />

            <!-- Dropdown: Change Bill -->
            <q-btn-dropdown flat dense label="Change Bill"  >
              <q-list>
                <q-item clickable to="/commercial-bill"><q-item-section>Commercial</q-item-section></q-item>
                <q-item clickable to="/non-commercial"><q-item-section>Non-Commercial</q-item-section></q-item>
              </q-list>
            </q-btn-dropdown>

            <q-btn flat dense label="Approvals" to="/approvals" />

            <!-- Dropdown: Trial -->
            <q-btn-dropdown flat dense label="Trial"  >
              <q-list>
                <q-item clickable to="/trial-request"><q-item-section>Trial Request</q-item-section></q-item>
                <q-item clickable to="/extend-trial"><q-item-section>Extend Trial</q-item-section></q-item>
              </q-list>
            </q-btn-dropdown>

            <q-btn flat dense   label="Reports" to="/reports" />

          </q-toolbar>
          <q-space />

          <!-- Notifications -->
          <q-btn flat dense icon="notifications">
            <q-badge color="red" floating>3</q-badge>
          </q-btn>

          <!-- Settings -->
          <q-btn flat dense icon="settings" />

          <!-- Profile Dropdown -->
          <q-btn flat dense>
            <q-avatar size="30px">
              <q-img src="https://i.pravatar.cc/40" />
            </q-avatar>
            <q-menu anchor="bottom right" self="top right">
              <q-list>
                <q-item clickable><q-item-section>Profile</q-item-section></q-item>
                <q-item clickable><q-item-section>Logout</q-item-section></q-item>
              </q-list>
            </q-menu>
          </q-btn>

</q-toolbar>
    </q-header>

    <!-- Secondary Header: Menu Bar -->
   

    <!-- Main Content -->
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>
