<template>
  <div>
    <q-expansion-item default-opened>
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar icon="contact_support" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          {{ title }}
        </q-item-section>
      </template>

      <q-card class="q-pa-md">
        <q-card-section>
          <div class="row q-col-gutter-md items-center">
            <div class="col-12 col-sm-6 col-md-4 col-lg-10 m-auto">
              <q-table :rows="rows"
                       :columns="tableColumns"
                       row-key="id"
                       :pagination="{ rowsPerPage: 0 }"
                       :rows-per-page-options="[0]"
                       flat
                       bordered>
                <template v-slot:body-cell-product_type="props">
                  <q-td :props="props" width="200">
                    <q-select v-model="props.row.product_type" outlined :options="productTypeOptions" dense borderless />
                  </q-td>
                </template>

                <template v-slot:body-cell-name="props">
                  <q-td :props="props" width="400">
                    <q-select v-model="props.row.name" outlined :options="productOptions" dense borderless />
                  </q-td>
                </template>

                <template v-slot:body-cell-rate="props">
                  <q-td :props="props" width="200">
                    <q-input v-model.number="props.row.rate" input-class="text-right" type="number" outlined dense borderless />
                  </q-td>
                </template>

                <template v-slot:body-cell-quantity="props">
                  <q-td :props="props" width="200">
                    <q-input v-model.number="props.row.quantity" input-class="text-right" type="number" outlined dense borderless />
                  </q-td>
                </template>

                <template v-slot:body-cell-total="props">
                  <q-td :props="props" width="200" outlined>
                    {{ (props.row.rate * props.row.quantity) || 0 }}
                  </q-td>
                </template>

                <template v-slot:body-cell-actions="props">
                  <q-td :props="props" class="text-center" width="50">
                    <q-btn flat round icon="delete" color="red" @click="removeRow(props.row.id)" />
                  </q-td>
                </template>
              </q-table>
              <div class="flex justify-between">
                <div class="q-mt-md">
                  <q-btn label="Add Row" icon="add" color="primary" @click="addRow" />
                </div>

                <div class="q-mt-md text-right">
                  <div>Subtotal: <strong>{{ subtotal }}</strong></div>
                  <div>Tax (18%): <strong>{{ tax }}</strong></div>
                  <div>Grand Total: <strong>{{ grandTotal }}</strong></div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  name: 'ProductValueTable',
  props: {
    title: {
      type: String,
      default: 'Product Value'
    },
    initialRows: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      productOptions: ['Equity', 'Mobile', 'Finance', 'Agri'],
      productTypeOptions: ['Package', 'Add On', 'Other Charges'],
      rows: this.initialRows.length > 0 ? this.initialRows : [
        { id: 1, product_type: "Package", name: 'Equity', rate: 250, quantity: 2 },
        { id: 2, product_type: "Add On", name: 'Mobile', rate: 300, quantity: 5 }
      ],
      tableColumns: [
        { name: 'product_type', label: 'Product Type', field: 'product_type', align: 'left' },  
        { name: 'name', label: 'Product', field: 'name', align: 'left' },
        { name: 'rate', label: 'Rate', field: 'rate', align: 'right' },
        { name: 'quantity', label: 'No Of Ids', field: 'quantity', align: 'right' },
        { name: 'total', label: 'Total', field: 'total', align: 'right' },
        { name: 'actions', label: '', field: 'actions', align: 'center' }
      ]
    };
  },
  computed: {
    subtotal() {
      return this.rows.reduce((acc, row) => acc + (parseFloat(row.rate || 0) * parseFloat(row.quantity || 0)), 0).toFixed(2);
    },
    tax() {
      return (parseFloat(this.subtotal) * 0.18).toFixed(2);
    },
    grandTotal() {
      return (parseFloat(this.subtotal) + parseFloat(this.tax)).toFixed(2);
    }
  },
  methods: {
    addRow() {
      const maxId = this.rows.reduce((max, row) => Math.max(max, row.id), 0);
      this.rows.push({ id: maxId + 1, product_type: null, name: null, rate: 0, quantity: 1 });
      this.$emit('update:rows', this.rows);
    },
    removeRow(idToRemove) {
      this.rows = this.rows.filter(row => row.id !== idToRemove);
      this.$emit('update:rows', this.rows);
    }
  }
}
</script>