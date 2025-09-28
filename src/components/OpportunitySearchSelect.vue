<template>
  <div class="searchable-select">
    <q-input
      dense
      outlined
      v-model="search"
      :label="label"
      @focus="showDropdown"
      @input="showDropdown"
      ref="searchInput">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-card v-if="dropdown" class="dropdown-card">
      <q-table
        :rows="filteredData"
        :columns="columns"
        row-key="id"
        dense
        flat
        hide-bottom
        separator="horizontal"
        @row-click="selectItem">
      </q-table>
    </q-card>

    <div v-if="selectedItem && showSelected" class="q-mt-md">
      <strong>Selected:</strong>
      <div v-for="col in columns" :key="col.name">
        {{ col.label }}: {{ selectedItem[col.field] }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'OpportunitySearchSelect',
  props: {
    label: {
      type: String,
      default: 'Search Opportunity'
    },
    modelValue: {
      type: Object,
      default: null
    },
    showSelected: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'select'],
  data() {
    return {
      search: '',
      dropdown: false,
      selectedItem: this.modelValue,
      // Opportunity data
      opportunities: [
        { id: 1, name: 'Cloud Migration', value: 25000, status: 'Open' },
        { id: 2, name: 'Software Upgrade', value: 15000, status: 'Open' },
        { id: 3, name: 'Security Implementation', value: 35000, status: 'Qualified' },
        { id: 4, name: 'Data Center Relocation', value: 50000, status: 'Negotiation' },
        { id: 5, name: 'Network Expansion', value: 20000, status: 'Proposal' },
      ],
      // Opportunity columns
      columns: [
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name' },
        { name: 'value', label: 'Value', align: 'right', field: 'value' },
        { name: 'status', label: 'Status', align: 'left', field: 'status' },
      ]
    }
  },
  computed: {
    filteredData() {
      const term = this.search.toLowerCase()
      if (!term) return this.opportunities
      
      return this.opportunities.filter(item => {
        return this.columns.some(col => {
          const value = item[col.field]
          return value && value.toString().toLowerCase().includes(term)
        })
      })
    }
  },
  methods: {
    selectItem(evt, row) {
      this.selectedItem = row
      this.search = row[this.columns[0].field] || row.name || ''
      this.dropdown = false
      this.$emit('update:modelValue', row)
      this.$emit('select', row)
    },
    showDropdown() {
      this.dropdown = true
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.dropdown = false
      }
    })
  }
}
</script>

<style scoped>
.searchable-select {
  position: relative;
}

.dropdown-card {
  position: absolute;
  z-index: 1000;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 4px;
}
</style>