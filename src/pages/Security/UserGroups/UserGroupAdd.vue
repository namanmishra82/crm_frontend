<template>
  <br />
  <router-link to="/" class="text-primary q-ma-lg">
    <q-icon name="west" /> Back to Dashboard
  </router-link>

  <q-card class="my-card q-ma-md">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6">Add User Group</div>
        <q-btn color="primary text-capitalize" label="Save" icon="save" />
      </div>
      <div class="text-subtitle2">User Group Management</div>
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
                      Group Information
                    </q-item-section>

                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-col-gutter-md items-center">

                        <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                          <q-input dense outlined v-model="text" label="Group Name" />
                        </div>
                        <div class="col-12 col-sm-6 col-md-4 col-lg-2">
                          <q-select dense outlined v-model="model" :options="Status" label="Select Status" />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-separator />

                <q-expansion-item default-opened>
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar icon="security" color="primary" text-color="white" />
                    </q-item-section>

                    <q-item-section>
                      Permissions
                    </q-item-section>
                  </template>

                  <q-card class="q-pa-md">
                    <q-card-section>
                      <div class="row q-mb-md bg-grey-2 q-pa-sm">
                        <div class="col-4 text-weight-bold">Module Name</div>
                        <div class="col-1 text-center text-weight-bold">Add</div>
                        <div class="col-1 text-center text-weight-bold">Edit</div>
                        <div class="col-1 text-center text-weight-bold">Delete</div>
                        <div class="col-2 text-center text-weight-bold">View</div>
                        <div class="col-1 text-center text-weight-bold">Export</div>
                        <div class="col-2 text-center text-weight-bold">Print</div>
                      </div>
                      <q-tree
                        :nodes="permissionNodes"
                        node-key="id"
                        default-expand-all
                        no-connectors>
                        <template v-slot:default-header="prop">
                          <div class="row items-center full-width q-py-xs">
                            <div class="col-4">
                              <q-icon :name="prop.node.icon" class="q-mr-sm" />
                              {{ prop.node.label }}
                            </div>
                            <div class="col-1 text-center">
                              <q-checkbox v-model="prop.node.permissions.add" dense />
                            </div>
                            <div class="col-1 text-center">
                              <q-checkbox v-model="prop.node.permissions.edit" dense />
                            </div>
                            <div class="col-1 text-center">
                              <q-checkbox v-model="prop.node.permissions.delete" dense />
                            </div>
                            <div class="col-2 text-center">
                              <q-checkbox v-model="prop.node.permissions.list" dense />
                            </div>
                            <div class="col-1 text-center">
                              <q-checkbox v-model="prop.node.permissions.export" dense />
                            </div>
                            <div class="col-2 text-center">
                              <q-checkbox v-model="prop.node.permissions.print" dense />
                            </div>
                          </div>
                        </template>
                      </q-tree>
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
<script>
  export default {
    name: 'UserGroupAddPage',
    data() {
      return {
        Status: [
          'Active', 'Inactive'
        ],
        permissionNodes: [
          {
            id: 'crm',
            label: 'CRM',
            icon: 'group',
            permissions: { add: false, edit: false, delete: false, list: false, export: false, print: false },
            children: [
              {
                id: 'leads',
                label: 'Leads',
                icon: 'layers',
                permissions: { add: false, edit: false, delete: false, list: false, export: false, print: false }
              },
              {
                id: 'opportunities',
                label: 'Opportunities',
                icon: 'online_prediction',
                permissions: { add: false, edit: false, delete: false, list: false, export: false, print: false }
              }
            ]
          },
          {
            id: 'finance',
            label: 'Finance',
            icon: 'receipt_long',
            permissions: { add: false, edit: false, delete: false, list: false, export: false, print: false },
            children: [
              {
                id: 'invoices',
                label: 'Invoice Management',
                icon: 'receipt',
                permissions: { add: false, edit: false, delete: false, list: false, export: false, print: false }
              },
              {
                id: 'payments',
                label: 'Payment Receipt',
                icon: 'account_balance',
                permissions: { add: false, edit: false, delete: false, list: false, export: false, print: false }
              }
            ]
          },
          {
            id: 'reports',
            label: 'Reports',
            icon: 'bar_chart',
            permissions: { add: false, edit: false, delete: false, list: false, export: false, print: false }
          },
          {
            id: 'security',
            label: 'Security',
            icon: 'security',
            permissions: { add: false, edit: false, delete: false, list: false, export: false, print: false },
            children: [
              {
                id: 'users',
                label: 'Users',
                icon: 'person',
                permissions: { add: false, edit: false, delete: false, list: false, export: false, print: false }
              },
              {
                id: 'usergroups',
                label: 'User Groups',
                icon: 'group',
                permissions: { add: false, edit: false, delete: false, list: false, export: false, print: false }
              }
            ]
          }
        ],
        text: '',
        model: null,
        remarks: ''
      };
    }
  }
</script>