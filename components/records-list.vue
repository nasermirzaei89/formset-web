<template>
  <v-card variant="tonal">
    <v-card-title>Records List</v-card-title>
    <v-card-text>
      <v-data-table-server
          :items-per-page="itemsPerPage"
          :headers="headers"
          :items-length="totalItems"
          :items="items"
          :loading="loading"
          hover
          @update:options="loadItems"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useAuth0} from "@auth0/auth0-vue";

type Record = {
  uuid: string;
  title: string;
  name: string;
  data: {};
}

const auth0 = process.client ? useAuth0() : undefined


const itemsPerPage = ref<number>(10)
const headers = ref<any[]>([])
const items = ref<Record[]>([])
const loading = ref<boolean>(false)
const totalItems = ref<number>(0)

async function loadItems() {
  loading.value = true

  try {
    const res = await $fetch('http://localhost:8000/records',{
      headers: {
        Authorization: `Bearer ${auth0?.idTokenClaims.value.__raw}`
      }
    }).catch((error) => error.data) as Record[]

    items.value = res.map((item) => Object.assign({}, ...Object.keys(item).map((key => ({[key]: JSON.stringify(item[key])})))))

    let h: string[] = []

    for (const item of res) {
      h = [...h, ...Object.keys(item.data)]
    }

    headers.value = h.map((v) => ({
      title: v,
      key: v,
      sortable: false,
    }))

    totalItems.value = res.length
  } finally {
    loading.value = false
  }
}
</script>