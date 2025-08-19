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
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [{
          label: 'Leads Generated',
          data: [25, 32, 28, 45, 38, 52],
          fill: false,
          borderColor: '#2196f3',
          backgroundColor: '#2196f3',
          tension: 0.4,
          pointRadius: 5
        }, {
          label: 'Opportunities Created',
          data: [12, 18, 15, 22, 19, 28],
          fill: false,
          borderColor: '#4caf50',
          backgroundColor: '#4caf50',
          tension: 0.4,
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Weekly Sales Pipeline Trend'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.raw}`
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Count'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time Period'
            }
          }
        }
      }
    })
  })
</script>
