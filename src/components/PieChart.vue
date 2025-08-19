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
      labels: ['Data Feed', 'Terminal', 'Consulting', 'Support'],
      datasets: [{
        label: 'Sales by Product',
        data: [450, 320, 180, 150],
        backgroundColor: ['#1976d2', '#388e3c', '#f57c00', '#7b1fa2']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Sales by Product Type ($K)'
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: $${context.raw}K`
            }
          }
        }
      }
    }
  })
})
</script>
