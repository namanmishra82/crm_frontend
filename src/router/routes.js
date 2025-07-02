const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),

    //component: () => import('layouts/TopMenu.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'Lead', component: () => import('pages/Lead/Lead.vue') },
      { path: 'Proposal', component: () => import('pages/Proposal/Proposal.vue') },
      { path: 'ProposalAdd', component: () => import('pages/Proposal/ProposalAdd.vue') },
      { path: 'Trial_Request', component: () => import('pages/Trial_Request/Trial_Request.vue') },
      { path: 'Trial_RequestAdd', component: () => import('pages/Trial_Request/Trial_RequestAdd.vue') },
      { path: 'Trial_Extend', component: () => import('pages/Trial_Extend/Trial_Extend.vue') },
      { path: 'Trial_ExtendAdd', component: () => import('pages/Trial_Extend/Trial_ExtendAdd.vue') },
      { path: 'User', component: () => import('pages/User.vue') },
      { path: 'Field', component: () => import('pages/Field.vue') },
      { path: 'login', component: () => import('pages/login.vue') },
      { path: 'leadadd', component: () => import('pages/Lead/leadadd.vue') },
      { path: 'Opportunity', component: () => import('pages/Opportunity/Opportunity.vue') },
      { path: 'OpportunityAdd', component: () => import('pages/Opportunity/OpportunityAdd.vue') }
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
