<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="text-h4">Forms</span>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="form in forms" :key="form.uuid">
        <v-card :to="{name:'forms-formName', params: {formName:form.name}}" class="text-center pa-8 fill-height" variant="tonal" color="primary">
          <v-card-title class="text-h5">{{ form.title }}</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2" key="new">
        <v-card to="/forms/new" class="text-center pa-8 fill-height border-dashed" variant="outlined"
                color="primary">
          <v-card-title class="text-h5">Add Form</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {useAuth0} from '@auth0/auth0-vue';

definePageMeta({
  layout: 'dashboard',
});

const auth0 = process.client ? useAuth0() : undefined

const forms = ref([])

if (process.client) {
  auth0?.getAccessTokenSilently().then((res)=>{
    $fetch('http://localhost:8000/forms',{
      headers: {
        Authorization: `Bearer ${auth0?.idTokenClaims.value.__raw}`
      }
    }).then((res: any[])=>{
      forms.value = res
    })
  })
}
</script>
