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
        labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
        datasets: [{
          label: 'Sales Target',
          data: [800, 850, 900, 950, 1000, 1050],
          borderColor: '#ff9800',
          backgroundColor: 'transparent',
          borderWidth: 2
        }, {
          label: 'Actual Sales',
          data: [750, 920, 880, 1020, 980, 1100],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Sales Performance vs Target'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: $${context.raw}K`
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue ($K)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Quarter'
            }
          }
        }
      }
    })
  })
</script>
