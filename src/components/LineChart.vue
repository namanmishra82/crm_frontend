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
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        datasets: [{
          label: 'Votes',
          data: [12, 19, 3, 5],
          fill: false,
          borderColor: '#3b82f6', // blue-500
          backgroundColor: '#3b82f6',
          tension: 0.4, // smooth curve
          pointBackgroundColor: ['#f87171', '#60a5fa', '#facc15', '#34d399'],
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Votes by Color'
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw} votes`
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Votes'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Colors'
            }
          }
        }
      }
    })
  })
</script>
