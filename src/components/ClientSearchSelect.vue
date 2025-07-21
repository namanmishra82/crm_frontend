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
/* eslint-disable vue/multi-word-component-names */
export default {
  name: 'ClientSearchSelect',
  props: {
    label: {
      type: String,
      default: 'Search Client'
    },
    modelValue: {
      type: Object,
      default: null
    },
    showSelected: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'select'],
  data() {
    return {
      search: '',
      dropdown: false,
      selectedItem: this.modelValue,
      // Client data
      clients: [
        { id: 1, name: 'Acme Corporation', category: 'Enterprise', industry: 'Manufacturing' },
        { id: 2, name: 'Globex Corporation', category: 'Enterprise', industry: 'Technology' },
        { id: 3, name: 'Initech', category: 'SMB', industry: 'Software' },
        { id: 4, name: 'Umbrella Corporation', category: 'Enterprise', industry: 'Pharmaceuticals' },
        { id: 5, name: 'Stark Industries', category: 'Enterprise', industry: 'Defense' },
      ],
      // Client columns
      columns: [
        { name: 'name', required: true, label: 'Account Name', align: 'left', field: 'name' },
        { name: 'category', label: 'Category', align: 'left', field: 'category' },
        { name: 'industry', label: 'Industry', align: 'left', field: 'industry' },
      ]
    }
  },
  computed: {
    filteredData() {
      const term = this.search.toLowerCase()
      if (!term) return this.clients
      
      return this.clients.filter(item => {
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