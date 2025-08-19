<template>
  <q-select
    v-model="selectedProposal"
    :options="filteredProposals"
    :label="label"
    outlined
    dense
    use-input
    input-debounce="300"
    @filter="filterProposals"
    @update:model-value="onSelect"
    option-label="name"
    option-value="id"
    clearable
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.name }}</q-item-label>
          <q-item-label caption>{{ scope.opt.proposalNo }} - {{ scope.opt.client }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:selected-item="scope">
      <span>{{ scope.opt?.name || '' }}</span>
    </template>
  </q-select>
</template>

<script>
export default {
  name: 'ProposalSearchSelect',
  props: {
    label: {
      type: String,
      default: 'Search Proposal'
    },
    modelValue: {
      type: Object,
      default: null
    }
  },
  emits: ['update:modelValue', 'select'],
  data() {
    return {
      selectedProposal: this.modelValue,
      filteredProposals: [],
      proposals: [
        { id: 1, name: 'Equity Trading Platform', proposalNo: 'PROP-001', client: 'Acme Inc.', productType: 'Data Feed' },
        { id: 2, name: 'Mobile Trading App', proposalNo: 'PROP-002', client: 'Globex Corp', productType: 'Terminal' },
        { id: 3, name: 'Risk Management System', proposalNo: 'PROP-003', client: 'Initech', productType: 'Data Feed' },
        { id: 4, name: 'Portfolio Analytics', proposalNo: 'PROP-004', client: 'Umbrella LLC', productType: 'Terminal' },
        { id: 5, name: 'Market Data Feed', proposalNo: 'PROP-005', client: 'Stark Industries', productType: 'Data Feed' }
      ]
    };
  },
  watch: {
    modelValue(newVal) {
      this.selectedProposal = newVal;
    },
    selectedProposal(newVal) {
      this.$emit('update:modelValue', newVal);
    }
  },
  mounted() {
    this.filteredProposals = this.proposals;
  },
  methods: {
    filterProposals(val, update) {
      update(() => {
        if (val === '') {
          this.filteredProposals = this.proposals;
        } else {
          const needle = val.toLowerCase();
          this.filteredProposals = this.proposals.filter(proposal => 
            proposal.name.toLowerCase().includes(needle) ||
            proposal.proposalNo.toLowerCase().includes(needle) ||
            proposal.client.toLowerCase().includes(needle)
          );
        }
      });
    },
    onSelect(proposal) {
      this.$emit('select', proposal);
    }
  }
}
</script>