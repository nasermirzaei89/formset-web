<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" sm="10" md="9" lg="8" xl="6">
        <v-btn to="/dashboard" variant="plain" prepend-icon="mdi-arrow-left">Back</v-btn>
        <div class="text-h4">New Form</div>
        <v-form class="py-8" @submit.prevent="createForm">
          <v-text-field label="Title" v-model="title"/>
          <v-btn color="primary" type="submit" variant="flat" :loading="creating" size="large">Create</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {useRouter} from "#app";
import {useAuth0} from "@auth0/auth0-vue";

definePageMeta({
  layout: 'dashboard',
});

const title = ref('')
const creating = ref(false)

const router = useRouter()

const auth0 = process.client ? useAuth0() : undefined

async function createForm() {
  creating.value = true

  try {
    await $fetch('http://localhost:8000/forms', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth0?.idTokenClaims.value.__raw}`,
      },
      body: JSON.stringify({title: title.value}),
    }).catch((error) => error.data)

    await router.push('/dashboard')
  } finally {
    creating.value = false
  }
}
</script>
