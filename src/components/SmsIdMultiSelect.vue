<template>
  <div class="sms-id-select">
    <q-input
      dense
      outlined
      v-model="displayValue"
      :label="label"
      readonly
      @click="openDialog">
      <template v-slot:append>
        <q-icon name="arrow_drop_down" class="cursor-pointer" />
      </template>
    </q-input>

    <!-- Selected Items Display -->
    <div v-if="selectedItems.length > 0 && showSelectedInForm" class="q-mt-sm">
      <q-table
        :rows="selectedItems"
        :columns="displayColumns"
        row-key="id"
        dense
        flat
        hide-bottom
        class="selected-items-table">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round icon="close" size="sm" @click="removeItem(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 800px; height: 600px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Select SMS Users</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input
            dense
            outlined
            v-model="searchTerm"
            label="Search SMS Users"
            clearable>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-section style="height: 400px; overflow-y: auto;">
          <q-table
            :rows="filteredItems"
            :columns="columns"
            row-key="id"
            dense
            flat
            hide-bottom
            selection="multiple"
            v-model:selected="selectedItems">
          </q-table>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Clear All" @click="clearAll" />
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="OK" @click="confirmSelection" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'SmsIdMultiSelect',
  props: {
    label: {
      type: String,
      default: 'Select SMS IDs'
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    showSelectedInForm: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      dialog: false,
      searchTerm: '',
      selectedItems: [...this.modelValue],
      smsUsers: [
        { id: 1, sms_id: 'SMS001', name: 'John Doe', package: 'Premium', last_invoice_date: '2024-01-15' },
        { id: 2, sms_id: 'SMS002', name: 'Jane Smith', package: 'Basic', last_invoice_date: '2024-01-20' },
        { id: 3, sms_id: 'SMS003', name: 'Mike Johnson', package: 'Standard', last_invoice_date: '2024-01-10' },
        { id: 4, sms_id: 'SMS004', name: 'Sarah Wilson', package: 'Premium', last_invoice_date: '2024-01-25' },
        { id: 5, sms_id: 'SMS005', name: 'David Brown', package: 'Basic', last_invoice_date: '2024-01-18' },
        { id: 6, sms_id: 'SMS006', name: 'Lisa Davis', package: 'Standard', last_invoice_date: '2024-01-22' },
        { id: 7, sms_id: 'SMS007', name: 'Tom Miller', package: 'Premium', last_invoice_date: '2024-01-12' },
        { id: 8, sms_id: 'SMS008', name: 'Amy Garcia', package: 'Basic', last_invoice_date: '2024-01-28' }
      ],
      columns: [
        { name: 'sms_id', label: 'SMS ID', field: 'sms_id', align: 'left' },
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'package', label: 'Package', field: 'package', align: 'left' },
        { name: 'last_invoice_date', label: 'Last Invoice Date', field: 'last_invoice_date', align: 'left' }
      ],
      displayColumns: [
        { name: 'sms_id', label: 'SMS ID', field: 'sms_id', align: 'left' },
        { name: 'name', label: 'Name', field: 'name', align: 'left' },
        { name: 'package', label: 'Package', field: 'package', align: 'left' },
        { name: 'last_invoice_date', label: 'Last Invoice Date', field: 'last_invoice_date', align: 'left' },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
      ]
    }
  },
  computed: {
    displayValue() {
      if (this.selectedItems.length === 0) return ''
      if (this.selectedItems.length === 1) return this.selectedItems[0].sms_id
      return `${this.selectedItems.length} SMS Users selected`
    },
    filteredItems() {
      if (!this.searchTerm) return this.smsUsers
      const term = this.searchTerm.toLowerCase()
      return this.smsUsers.filter(item => 
        item.sms_id.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term) ||
        item.package.toLowerCase().includes(term)
      )
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    removeItem(item) {
      const index = this.selectedItems.findIndex(selected => selected.id === item.id)
      if (index > -1) {
        this.selectedItems.splice(index, 1)
        this.$emit('update:modelValue', this.selectedItems)
        this.$emit('change', this.selectedItems)
      }
    },
    clearAll() {
      this.selectedItems = []
    },
    confirmSelection() {
      this.$emit('update:modelValue', this.selectedItems)
      this.$emit('change', this.selectedItems)
      this.dialog = false
    }
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.selectedItems = [...newVal]
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.sms-id-select {
  position: relative;
}
.selected-items-table {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>