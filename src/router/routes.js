const routes = [
  // Login route (no layout)
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: () => import('pages/Dashboard.vue') },
      { path: 'Client_Master', component: () => import('pages/Client_Master/Client_Master.vue') },
      { path: 'Client_Master_View', component: () => import('pages/Client_Master/Client_Master_View.vue') },
      { path: 'Lead', component: () => import('pages/Lead/Lead.vue') },
      { path: 'leadadd', component: () => import('pages/Lead/leadadd.vue') },
      { path: 'leadEdit', component: () => import('pages/Lead/leadEdit.vue') },
      { path: 'Proposal', component: () => import('pages/Proposal/Proposal.vue') },
      { path: 'ProposalAdd', component: () => import('pages/Proposal/ProposalAdd.vue') },
      { path: 'Subscription', component: () => import('pages/Subscription/Subscription.vue') },
      { path: 'SubscriptionAdd', component: () => import('pages/Subscription/SubscriptionAdd.vue') },
      { path: 'New_Subscription', component: () => import('pages/New_Subscription/New_Subscription.vue') },
      { path: 'New_SubscriptionAdd', component: () => import('pages/New_Subscription/New_SubscriptionAdd.vue') },
      { path: 'Trial_Request', component: () => import('pages/Trial_Request/Trial_Request.vue') },
      { path: 'Trial_RequestAdd', component: () => import('pages/Trial_Request/Trial_RequestAdd.vue') },
      { path: 'Trial_Extend', component: () => import('pages/Trial_Extend/Trial_Extend.vue') },
      { path: 'Trial_ExtendAdd', component: () => import('pages/Trial_Extend/Trial_ExtendAdd.vue') },
      { path: 'Manual_Invoice', component: () => import('pages/Manual_Invoice/Manual_Invoice.vue') },
      { path: 'InvoiceAdd', component: () => import('pages/Manual_Invoice/InvoiceAdd.vue') },
      { path: 'Currency_Conversion', component: () => import('pages/Currency_Conversion/Currency_Conversion.vue') },      
      { path: 'Currency_ConversionAdd', component: () => import('pages/Currency_Conversion/Currency_ConversionAdd.vue') },
      { path: 'Commercial', component: () => import('pages/Change_Bill/Commercial.vue') },
      { path: 'CommercialBAdd', component: () => import('pages/Change_Bill/CommercialBAdd.vue') },
      { path: 'NonCommercial', component: () => import('pages/Change_Bill/NonCommercial.vue') },
      { path: 'NonCommercialBAdd', component: () => import('pages/Change_Bill/NonCommercialBAdd.vue') },
      { path: 'User', component: () => import('pages/User.vue') },
      { path: 'Payments', component: () => import('pages/Payments/Payments.vue') },
      { path: 'PaymentsAdd', component: () => import('pages/Payments/PaymentsAdd.vue') },
      { path: 'StopBill', component: () => import('pages/StopBill/StopBill.vue') },
      { path: 'StopBillAdd', component: () => import('pages/StopBill/StopBillAdd.vue') },
      { path: 'Salvage_Disconnect', component: () => import('pages/Salvage_Disconnect/Salvage_Disconnect.vue') },
      { path: 'Salvage_DisconnectAdd', component: () => import('pages/Salvage_Disconnect/Salvage_DisconnectAdd.vue') },
      { path: 'Action_Log', component: () => import('pages/Action_Log/Action_Log.vue') },
      { path: 'Action_LogAdd', component: () => import('pages/Action_Log/Action_LogAdd.vue') },
      { path: 'StartBill', component: () => import('pages/Finance/StartBill.vue') },
      { path: 'StartBillUpdate/:id', component: () => import('pages/Finance/StartBillUpdate.vue') },
      { path: 'login', component: () => import('pages/login.vue') },
      { path: 'Opportunity', component: () => import('pages/Opportunity/Opportunity.vue') },
      { path: 'OpportunityAdd', component: () => import('pages/Opportunity/OpportunityAdd.vue')},
      { path: 'OpportunityEdit', component: () => import('pages/Opportunity/OpportunityEdit.vue')},
      { path: 'Smart_Login_Import', component: () => import('pages/Smart_Login_Import/Smart_Login_Import.vue') },
      { path: 'Smart_Login_ImportAdd', component: () => import('pages/Smart_Login_Import/Smart_Login_ImportAdd.vue') },
      { path: 'UserGroups', component: () => import('pages/Security/UserGroups/UserGroups.vue') },
      { path: 'UserGroupAdd', component: () => import('pages/Security/UserGroups/UserGroupAdd.vue') },
      { path: 'UserGroupEdit', component: () => import('pages/Security/UserGroups/UserGroupEdit.vue') },
      { path: 'Users', component: () => import('pages/Security/Users/Users.vue') },
      { path: 'UserAdd', component: () => import('pages/Security/Users/UserAdd.vue') },
      { path: 'UserEdit', component: () => import('pages/Security/Users/UserEdit.vue') }
    ]
  },

  // Catch-all route for 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

// ✅ FIX: export routes properly
export default routes
