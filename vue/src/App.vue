<script setup lang="ts">
import EchartsControl from './utils/echarts/EchartsControl.vue';
import { ref } from 'vue'
const options = ref<any>({
        xAxis: {
          type: 'category',
          data: [],
        },
        color: ['var(--dv-color-danger)'], // 颜色的变量字符串
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [],
            type: 'line',
          },
        ],
  })

setTimeout(() => {
  options.value = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        color: ['var(--dv-color-danger)'], // 颜色的变量字符串
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
          },
        ],
    }
}, 3000)
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div style="height: 300px;width: 400px;">
    <EchartsControl :options="options"></EchartsControl>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
