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
  name: 'TrialRequestSearchSelect',
  props: {
    label: {
      type: String,
      default: 'Search Trial Request'
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
      // Trial request data
      trialRequests: [
        { id: 1, requestNo: 'TR001', clientName: 'Acme Inc.', product: 'Equity', startDate: '2023-01-15', endDate: '2023-02-15' },
        { id: 2, requestNo: 'TR002', clientName: 'Globex Corp', product: 'Mobile', startDate: '2023-02-10', endDate: '2023-03-10' },
        { id: 3, requestNo: 'TR003', clientName: 'Initech', product: 'Money', startDate: '2023-03-05', endDate: '2023-04-05' },
        { id: 4, requestNo: 'TR004', clientName: 'Umbrella LLC', product: 'Money Plus', startDate: '2023-04-20', endDate: '2023-05-20' },
        { id: 5, requestNo: 'TR005', clientName: 'Stark Industries', product: 'General', startDate: '2023-05-15', endDate: '2023-06-15' },
      ],
      // Trial request columns
      columns: [
        { name: 'requestNo', required: true, label: 'Request No', align: 'left', field: 'requestNo' },
        { name: 'clientName', label: 'Client Name', align: 'left', field: 'clientName' },
        { name: 'product', label: 'Product', align: 'left', field: 'product' },
        { name: 'endDate', label: 'End Date', align: 'left', field: 'endDate' }
      ]
    }
  },
  computed: {
    filteredData() {
      const term = this.search.toLowerCase()
      if (!term) return this.trialRequests
      
      return this.trialRequests.filter(item => {
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
      this.search = row[this.columns[0].field] || row.requestNo || ''
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