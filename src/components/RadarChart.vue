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
    type: 'radar',
    data: {
      labels: ['Lead Generation', 'Conversion Rate', 'Deal Closure', 'Customer Retention', 'Revenue Growth'],
      datasets: [{
        label: 'Team A',
        data: [85, 78, 92, 88, 75],
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        borderColor: '#2196f3',
        borderWidth: 2
      }, {
        label: 'Team B',
        data: [75, 85, 80, 92, 88],
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: '#4caf50',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Sales Team Performance Comparison'
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20
          }
        }
      }
    }
  })
})
</script>
