<template>
  <v-card variant="tonal" class="pa-2" :loading="loading">
    <Line :data="chartData" :options="chartOptions"/>
  </v-card>
</template>

<script setup lang="ts">
import {Line} from 'vue-chartjs';
import {
  Chart,
  LineElement,
  PointElement,
  CategoryScale,
    LinearScale,
  Tooltip,
} from 'chart.js';
import {ref} from 'vue';
import {useAuth0} from "@auth0/auth0-vue";

const auth0 = process.client ? useAuth0() : undefined


Chart.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
);

const loading =ref<boolean>(false)

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#3CB043',
      data: [],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

loadItems();

async function loadItems() {
  loading.value = true

  try {
    const res = await $fetch('http://localhost:8000/records',{headers: {
        Authorization: `Bearer ${auth0?.idTokenClaims.value.__raw}`
      }}).catch((error) => error.data) as Record[]

    const labels = res.map((item)=> item.createdAt)
    const data = res.map((item)=> 1)

    chartData.value.labels = labels
    chartData.value.datasets[0].data = data

  //   items.value = res.map((item)=> Object.assign({}, ...Object.keys(item).map((key=>({[key]: JSON.stringify(item[key])})))))
  //   console.log(items.value)
  //   let h = []
  //
  //   for (const item of res) {
  //     h = [...h,...Object.keys(item.data)]
  //   }
  //
  //   headers.value = h.map((v) => ({
  //     title: v,
  //     key: v,
  //     sortable: false,
  //   }))
  //
  //   totalItems.value = res.length
  } finally {
    loading.value = false
  }
}
</script>