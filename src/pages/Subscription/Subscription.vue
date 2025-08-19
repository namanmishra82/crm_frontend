<template>
  <div class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6">Subscription Management</div>
      <q-btn color="primary" label="Add Subscription" icon="add" to="/SubscriptionAdd" />
    </div>

    <q-table
      :rows="subscriptions"
      :columns="columns"
      row-key="id"
      :pagination="pagination"
      flat
      bordered
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="text-center">
          <q-btn flat round icon="edit" color="primary" size="sm" @click="editSubscription(props.row)" />
          <q-btn flat round icon="delete" color="red" size="sm" @click="deleteSubscription(props.row)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionPage',
  data() {
    return {
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        { name: 'gtcNo', label: 'GTC No.', field: 'gtcNo', align: 'left', sortable: true },
        { name: 'subscriptionNo', label: 'Subscription No', field: 'subscriptionNo', align: 'left', sortable: true },
        { name: 'client', label: 'Client', field: 'client', align: 'left', sortable: true },
        { name: 'proposal', label: 'Proposal', field: 'proposal', align: 'left', sortable: true },
        { name: 'productType', label: 'Product Type', field: 'productType', align: 'left', sortable: true },
        { name: 'billingFrequency', label: 'Billing Frequency', field: 'billingFrequency', align: 'left', sortable: true },
        { name: 'status', label: 'Status', field: 'status', align: 'left', sortable: true },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
      ],
      subscriptions: [
        {
          id: 1,
          gtcNo: 'GTC-001',
          subscriptionNo: 'SUB-001',
          client: 'Acme Inc.',
          proposal: 'Equity Trading Platform',
          productType: 'Data Feed',
          billingFrequency: 'Quarterly',
          status: 'Active'
        },
        {
          id: 2,
          gtcNo: 'GTC-002',
          subscriptionNo: 'SUB-002',
          client: 'Globex Corp',
          proposal: 'Mobile Trading App',
          productType: 'Terminal',
          billingFrequency: 'Annual',
          status: 'Active'
        },
        {
          id: 3,
          gtcNo: 'GTC-003',
          subscriptionNo: 'SUB-003',
          client: 'Initech',
          proposal: 'Risk Management System',
          productType: 'Data Feed',
          billingFrequency: 'Half yearly',
          status: 'Pending'
        }
      ]
    };
  },
  methods: {
    editSubscription(subscription) {
      console.log('Edit subscription:', subscription);
      // Navigate to edit page
    },
    deleteSubscription(subscription) {
      console.log('Delete subscription:', subscription);
      // Show confirmation dialog and delete
    }
  }
}
</script>