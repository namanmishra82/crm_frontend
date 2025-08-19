<template>
  <q-select
    v-model="selectedAddress"
    :options="filteredAddresses"
    :label="label"
    outlined
    dense
    use-input
    input-debounce="300"
    @filter="filterAddresses"
    @update:model-value="onSelect"
    option-label="displayAddress"
    option-value="id"
    clearable
    :disable="!clientId"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.displayAddress }}</q-item-label>
          <q-item-label caption>{{ scope.opt.type }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:selected-item="scope">
      <span>{{ scope.opt?.displayAddress || '' }}</span>
    </template>
  </q-select>
</template>

<script>
export default {
  name: 'ClientAddressSelect',
  props: {
    label: {
      type: String,
      default: 'Select Address'
    },
    modelValue: {
      type: Object,
      default: null
    },
    clientId: {
      type: Number,
      default: null
    }
  },
  emits: ['update:modelValue', 'select'],
  data() {
    return {
      selectedAddress: this.modelValue,
      filteredAddresses: [],
      addresses: [
        { id: 1, clientId: 1, address: '123 Main St', city: 'New York', state: 'NY', zipCode: '10001', type: 'Billing', displayAddress: '123 Main St, New York, NY 10001' },
        { id: 2, clientId: 1, address: '456 Oak Ave', city: 'New York', state: 'NY', zipCode: '10002', type: 'Shipping', displayAddress: '456 Oak Ave, New York, NY 10002' },
        { id: 3, clientId: 2, address: '789 Pine Rd', city: 'Los Angeles', state: 'CA', zipCode: '90001', type: 'Billing', displayAddress: '789 Pine Rd, Los Angeles, CA 90001' },
        { id: 4, clientId: 2, address: '321 Elm St', city: 'Los Angeles', state: 'CA', zipCode: '90002', type: 'Shipping', displayAddress: '321 Elm St, Los Angeles, CA 90002' },
        { id: 5, clientId: 3, address: '654 Maple Dr', city: 'Chicago', state: 'IL', zipCode: '60601', type: 'Billing', displayAddress: '654 Maple Dr, Chicago, IL 60601' }
      ]
    };
  },
  watch: {
    modelValue(newVal) {
      this.selectedAddress = newVal;
    },
    selectedAddress(newVal) {
      this.$emit('update:modelValue', newVal);
    },
    clientId() {
      this.updateAddressList();
      this.selectedAddress = null;
      this.$emit('update:modelValue', null);
    }
  },
  mounted() {
    this.updateAddressList();
  },
  methods: {
    updateAddressList() {
      if (this.clientId) {
        this.filteredAddresses = this.addresses.filter(address => address.clientId === this.clientId);
      } else {
        this.filteredAddresses = [];
      }
    },
    filterAddresses(val, update) {
      update(() => {
        const clientAddresses = this.clientId ? 
          this.addresses.filter(address => address.clientId === this.clientId) : 
          [];
          
        if (val === '') {
          this.filteredAddresses = clientAddresses;
        } else {
          const needle = val.toLowerCase();
          this.filteredAddresses = clientAddresses.filter(address => 
            address.displayAddress.toLowerCase().includes(needle) ||
            address.type.toLowerCase().includes(needle)
          );
        }
      });
    },
    onSelect(address) {
      this.$emit('select', address);
    }
  }
}
</script>