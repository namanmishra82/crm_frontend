<template>
  <div>
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

    <q-card v-if="dropdown" class="q-mt-xs" style="position: absolute; z-index: 1000; min-width: 400px;">
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
  name: 'SearchableSelect',
  props: {
    label: {
      type: String,
      default: 'Search'
    },
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
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
      selectedItem: this.modelValue
    }
  },
  computed: {
    filteredData() {
      const term = this.search.toLowerCase()
      if (!term) return this.data
      
      return this.data.filter(item => {
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