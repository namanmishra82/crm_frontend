<template>
  <q-page class="q-pa-lg q-mt-md">
    <!-- First Row: 3 Cards -->
    <div class="row q-col-gutter-lg">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
        <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
          <q-card-section class="q-pb-none">
            <div class="row items-center justify-between">
              <div class="text-h6">Bar Chart</div>
            </div>
           </q-card-section>
          <q-separator dark inset />
          <q-card-section class="q-pa-md">
            <BarChart />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
        <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
          <q-card-section class="q-pb-none">
            <div class="row items-center justify-between">
              <div class="text-h6">Pie Chart</div>
            </div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section class="q-pa-md">
            <PieChart />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 ">
        <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
          <q-card-section class="q-pb-none">
            <div class="row items-center justify-between">
              <div class="text-h6">Radar Chart</div>
            </div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section class="q-pa-md">
            <RadarChart />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <br />
    <div class="row q-col-gutter-lg">
      <div class="col-lg-6 col-md-4 col-sm-12 col-xs-12 ">
        <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
          <q-card-section class="q-pb-none">
            <div class="row items-center justify-between">
              <div class="text-h6">Line Chart</div>
            </div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section class="q-pa-md">
            <LineChart />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-4 col-sm-12 col-xs-12 ">
        <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
          <q-card-section class="q-pb-none">
            <div class="row items-center justify-between">
              <div class="text-h6">Scatter Chart</div>
            </div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section class="q-pa-md">
            <ScatterChart />
          </q-card-section>
        </q-card>
      </div>

    </div>
    <br />
    <!-- Second Row: 2 Cards -->
    <div class="row q-col-gutter-lg">
      <div class="col-lg-12 col-md-4 col-sm-12 col-xs-12 ">
        <q-card class="q-ma-xs q-card q-card--bordered no-shadow card_style fit">
          <q-card-section class="q-pb-none">
            <div class="row items-center justify-between">
              <div class="text-h6">Scatter Chart</div>
            </div>
          </q-card-section>
          <q-separator dark inset />
          <q-card-section class="q-pa-md">
            <SalesChart />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>



<script setup>
  import BarChart from 'src/components/BarChart.vue'
  import PieChart from 'src/components/PieChart.vue'
  import RadarChart from 'src/components/RadarChart.vue'
  import LineChart from 'src/components/LineChart.vue'
  import ScatterChart from 'src/components/ScatterChart.vue'
  import SalesChart from 'src/components/SalesChart.vue'
</script>

