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
          label: 'Votes',
          data: [
            { x: 0, y: 12 },  // Red
            { x: 1, y: 19 },  // Blue
            { x: 2, y: 3 },   // Yellow
            { x: 3, y: 5 }    // Green
          ],
          backgroundColor: ['#f87171', '#60a5fa', '#facc15', '#34d399'],
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Label Index (0 = Red, etc.)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Votes'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const labels = ['Red', 'Blue', 'Yellow', 'Green']
                const index = context.dataIndex
                return `${labels[index]}: ${context.raw.y} votes`
              }
            }
          }
        }
      }
    })
  })
</script>
