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
  name: 'ContactPersonSearchSelect',
  props: {
    label: {
      type: String,
      default: 'Search Contact Person'
    },
    modelValue: {
      type: Object,
      default: null
    },
    clientId: {
      type: [Number, String],
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
      // Contact data
      contacts: [
        { id: 1, name: 'John Doe', email: 'john@acme.com', phone: '555-1234', clientId: 1 },
        { id: 2, name: 'Jane Smith', email: 'jane@acme.com', phone: '555-5678', clientId: 1 },
        { id: 3, name: 'Alice Brown', email: 'alice@globex.com', phone: '555-9012', clientId: 2 },
        { id: 4, name: 'Bob Johnson', email: 'bob@globex.com', phone: '555-3456', clientId: 2 },
        { id: 5, name: 'Eve Davis', email: 'eve@initech.com', phone: '555-7890', clientId: 3 },
        { id: 6, name: 'Frank Miller', email: 'frank@umbrella.com', phone: '555-2468', clientId: 4 },
        { id: 7, name: 'Grace Lee', email: 'grace@stark.com', phone: '555-1357', clientId: 5 }
      ],
      // Contact columns
      columns: [
        { name: 'name', required: true, label: 'Name', align: 'left', field: 'name' },
        { name: 'email', label: 'Email', align: 'left', field: 'email' },
        { name: 'phone', label: 'Phone', align: 'left', field: 'phone' }
      ]
    }
  },
  computed: {
    filteredData() {
      // First filter by client ID if provided
      let data = this.contacts;
      if (this.clientId) {
        data = data.filter(contact => contact.clientId === this.clientId);
      }
      
      // Then filter by search term
      const term = this.search.toLowerCase();
      if (!term) return data;
      
      return data.filter(item => {
        return this.columns.some(col => {
          const value = item[col.field];
          return value && value.toString().toLowerCase().includes(term);
        });
      });
    }
  },
  methods: {
    selectItem(evt, row) {
      this.selectedItem = row;
      this.search = row[this.columns[0].field] || row.name || '';
      this.dropdown = false;
      this.$emit('update:modelValue', row);
      this.$emit('select', row);
    },
    showDropdown() {
      this.dropdown = true;
    }
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.dropdown = false;
      }
    });
  },
  watch: {
    clientId: {
      immediate: true,
      handler() {
        // Reset selection when client changes
        this.selectedItem = null;
        this.search = '';
        this.$emit('update:modelValue', null);
      }
    },
    modelValue(newValue) {
      this.selectedItem = newValue;
      if (newValue) {
        this.search = newValue[this.columns[0].field] || newValue.name || '';
      }
    }
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