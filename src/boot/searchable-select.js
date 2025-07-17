import { boot } from 'quasar/wrappers'
import SearchableSelect from '../components/SearchableSelect.vue'
import ClientSearchSelect from '../components/ClientSearchSelect.vue'
import OpportunitySearchSelect from '../components/OpportunitySearchSelect.vue'

export default boot(({ app }) => {
  app.component('SearchableSelect', SearchableSelect)
  app.component('ClientSearchSelect', ClientSearchSelect)
  app.component('OpportunitySearchSelect', OpportunitySearchSelect)
})