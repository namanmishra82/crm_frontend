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
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Opportunities',
          data: [
            { x: 25, y: 20 },
            { x: 45, y: 35 },
            { x: 65, y: 50 },
            { x: 80, y: 75 },
            { x: 90, y: 85 },
            { x: 30, y: 15 },
            { x: 55, y: 40 },
            { x: 75, y: 65 }
          ],
          backgroundColor: '#ff9800',
          borderColor: '#f57c00',
          pointRadius: 8,
          pointHoverRadius: 10
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Deal Size vs Win Probability'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `Deal Size: $${context.raw.x}K, Win Probability: ${context.raw.y}%`
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Deal Size ($K)'
            },
            min: 0,
            max: 100
          },
          y: {
            title: {
              display: true,
              text: 'Win Probability (%)'
            },
            min: 0,
            max: 100
          }
        }
      }
    })
  })
</script>
