<template>
  <div>
    <br />
    <router-link to="/" class="text-primary q-ma-lg">
      <q_icon name="west" /> Back to Dashboard
    </router-link>

    <q_card class="my-card q-ma-sm col-auto">
      <q_card-section class="q-pb-none">
        <div class="row items-center justify-between">
          <div class="text-h6">Add Proposal</div>
          <q_btn color="primary text-capitalize" label="Save" icon="save" />
        </div>
        <div class="text-subtitle2">Proposal Management</div>
      </q_card-section>

      <q_separator dark inset />

      <q_card-section class="q-px-none">
        <div class="q-px-none field-add-tab">
          <div class="row q-col-gutter-md items-center">
            <div class="col-12">
              <div class="q-pa-md">
                <q_list bordered class="rounded-borders">
                  <q_expansion-item default-opened>
                    <template v-slot:header>
                      <q_item-section avatar>
                        <q_avatar icon="info" color="primary" text-color="white" />
                      </q_item-section>

                      <q_item-section>
                        Proposal Information
                      </q_item-section>
                    </template>

                    <q_card class="q-pa-md">
                      <q_card-section>
                        <div class="row q-col-gutter-md items-center">
                          <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                            <q_input dense outlined v-model="text" label="Proposal Name" />
                          </div>
                          <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                            <q_select dense outlined v-model="model" :options="options" label="Select Account" />
                          </div>
                        </div>
                      </q_card-section>
                    </q_card>
                  </q_expansion-item>

                  <q_separator />

                  <!-- Use the ProductValueTable component here -->
                  <ProductValueTable 
                    title="Proposal Value" 
                    :initialRows="productRows" 
                    @update:rows="updateProductRows" 
                  />

                  <q_separator />

                  <q_expansion-item default-opened>
                    <template v-slot:header>
                      <q_item-section avatar>
                        <q_avatar icon="attractions" color="primary" text-color="white" />
                      </q_item-section>

                      <q_item-section>
                        Terms and conditions
                      </q_item-section>
                    </template>

                    <q_card class="q-pa-md">
                      <q_card-section>
                        <div class="row q-col-gutter-md items-center">
                          <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                            <q_select outlined
                                    v-model="model"
                                    multiple
                                    :options="options"
                                    counter
                                    dense
                                    hint="With counter"
                                    label="Select Terms and conditions"/>
                          </div>
                        </div>
                      </q_card-section>
                    </q_card>
                  </q_expansion-item>
                </q_list>
              </div>
            </div>
          </div>
        </div>
      </q_card-section>
    </q_card>
  </div>
</template>

<script>
import ProductValueTable from '../../components/ProductValueTable.vue';

export default {
  name: 'ProposalPage',
  components: {
    ProductValueTable
  },
  data() {
    return {
      options: ['Google', 'Facebook', 'Twitter'],
      text: '',
      model: null,
      productRows: [
        { id: 1, product_type: "Package", name: 'MSOffice', rate: 250, quantity: 2 },
        { id: 2, product_type: "Add On", name: 'XP', rate: 300, quantity: 5 }
      ]
    };
  },
  methods: {
    updateProductRows(rows) {
      this.productRows = rows;
    }
  }
}
</script>