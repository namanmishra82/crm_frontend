const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),

    //component: () => import('layouts/TopMenu.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },      
      { path: 'Lead', component: () => import('pages/Lead.vue') },
      { path: 'Opportunity', component: () => import('pages/Opportunity.vue') },
      { path: 'Proposal', component: () => import('pages/Proposal.vue') },
      { path: 'User', component: () => import('pages/User.vue') },
      { path: 'Field', component: () => import('pages/Field.vue') },
      { path: 'login', component: () => import('pages/login.vue') },
      { path: 'leadadd', component: () => import('pages/leadadd.vue') }
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
