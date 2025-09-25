<template>
  <q-page padding>
    <div class="text-h4 q-mb-lg">Dashboard</div>
    
    <div class="row q-gutter-md">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card class="text-center">
          <q-card-section>
            <q-icon name="account_circle" size="3rem" color="primary" />
            <div class="text-h6 q-mt-sm">Total Accounts</div>
            <div class="text-h4 text-primary">{{ stats.totalAccounts }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card class="text-center">
          <q-card-section>
            <q-icon name="receipt" size="3rem" color="green" />
            <div class="text-h6 q-mt-sm">Active Subscriptions</div>
            <div class="text-h4 text-green">{{ stats.activeSubscriptions }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card class="text-center">
          <q-card-section>
            <q-icon name="account_balance_wallet" size="3rem" color="orange" />
            <div class="text-h6 q-mt-sm">Pending Invoices</div>
            <div class="text-h4 text-orange">{{ stats.pendingInvoices }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <q-card class="text-center">
          <q-card-section>
            <q-icon name="payment" size="3rem" color="purple" />
            <div class="text-h6 q-mt-sm">Monthly Revenue</div>
            <div class="text-h4 text-purple">₹{{ stats.monthlyRevenue }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-gutter-md q-mt-lg">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Recent Activities</div>
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item v-for="activity in recentActivities" :key="activity.id">
                <q-item-section avatar>
                  <q-icon :name="activity.icon" :color="activity.color" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ activity.title }}</q-item-label>
                  <q-item-label caption>{{ activity.time }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'DashboardPage',
  setup() {
    const stats = ref({
      totalAccounts: 0,
      activeSubscriptions: 0,
      pendingInvoices: 0,
      monthlyRevenue: 0
    })

    const recentActivities = ref([
      {
        id: 1,
        title: 'New subscription created',
        time: '2 hours ago',
        icon: 'add_circle',
        color: 'green'
      },
      {
        id: 2,
        title: 'Invoice generated',
        time: '4 hours ago',
        icon: 'receipt',
        color: 'blue'
      },
      {
        id: 3,
        title: 'Payment received',
        time: '6 hours ago',
        icon: 'payment',
        color: 'purple'
      }
    ])

    const loadDashboardData = async () => {
      // Mock data - replace with actual API calls
      stats.value = {
        totalAccounts: 1250,
        activeSubscriptions: 890,
        pendingInvoices: 45,
        monthlyRevenue: 125000
      }
    }

    onMounted(() => {
      loadDashboardData()
    })

    return {
      stats,
      recentActivities
    }
  }
}
</script>