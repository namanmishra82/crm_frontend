<!-- src/components/MyChart.vue -->
<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const chartCanvas = ref(null)

onMounted(() => {
  new Chart(chartCanvas.value, {
    type: 'pie',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green'],
      datasets: [{
        label: 'Votes',
        data: [12, 19, 3, 5],
        backgroundColor: ['#f87171', '#60a5fa', '#facc15', '#34d399']
      }]
    },
    options: {
      responsive: true
    }
  })
})
</script>
