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

<script setup>
definePageMeta({
  layout: 'dashboard',
});

const forms = await $fetch('http://localhost:8000/forms').catch((error) => error.data)
</script>
