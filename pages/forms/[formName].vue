<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" sm="10" md="9" lg="8" xl="6">
        <v-btn to="/dashboard" variant="plain" prepend-icon="mdi-arrow-left">Back</v-btn>
        <div class="text-h4">{{ form?.title }}</div>
        <v-tabs v-model="tab">
          <v-tab value="overview">Overview</v-tab>
          <v-tab value="records">Records</v-tab>
          <v-tab value="settings">Settings</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="overview">
            <records-chart v-if="form" form="form" class="my-2" />
          </v-window-item>
          <v-window-item value="records">
            <records-list v-if="form" form="form" class="my-2" />
          </v-window-item>
          <v-window-item value="settings">
            <v-card variant="tonal" class="my-2">
              <v-card-title>Info</v-card-title>
              <v-form @submit.prevent="updateForm">
              <v-card-text>
                <v-text-field label="Title" v-model="info.title" />
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" :loading="updatingForm" type="submit" variant="flat">Save</v-btn>
              </v-card-actions>
              </v-form>
            </v-card>
            <v-card variant="tonal" color="error" class="my-2">
              <v-card-item>Danger Zone</v-card-item>
              <v-card-text>
                Delete this form
              </v-card-text>
              <v-card-actions>
                <v-dialog v-model="deleteDialog" width="auto">
                  <template v-slot:activator="{ props }">
                    <v-btn color="error" v-bind="props" variant="flat">Delete</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>Delete Form</v-card-title>
                    <v-card-text>Are you sure to delete this form?</v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn @click="deleteDialog=false">Dismiss</v-btn>
                      <v-btn color="error" :loading="deletingForm" @click="deleteForm">Delete</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {useRouter} from "nuxt/app";
import RecordsList from "~/components/records-list.vue";
import {useAuth0} from "@auth0/auth0-vue";

definePageMeta({
  layout: 'dashboard',
});

const auth0 = process.client ? useAuth0() : undefined


const route = useRoute()
const router = useRouter()

const tab = ref()

const form = ref()
const loadingForm = ref(false)

const info = ref({title: undefined})
const updatingForm = ref(false)

const deletingForm = ref(false)
const deleteDialog = ref(false)

loadForm()

async function loadForm() {
  loadingForm.value = true

  try {
    form.value = await $fetch(`http://localhost:8000/forms/${route.params.formName}`,{
      headers: {
        Authorization: `Bearer ${auth0?.idTokenClaims.value.__raw}`
      }
    })
    info.value.title = form.value.title
  } catch (e) {
    await router.push('/dashboard')
  } finally {
    loadingForm.value = false
  }
}

async function updateForm() {
  updatingForm.value = true

  try {
    await $fetch(`http://localhost:8000/forms/${route.params.formName}`, {method: 'PATCH',headers: {
        Authorization: `Bearer ${auth0?.idTokenClaims.value.__raw}`
      }, body: JSON.stringify(info.value)}).catch((error) => error.data)

    await loadForm()
  } finally {
    updatingForm.value = false
  }
}

async function deleteForm() {
  deletingForm.value = true

  try {
    await $fetch(
        `http://localhost:8000/forms/${route.params.formName}`,
        {method: 'DELETE',headers: {
            Authorization: `Bearer ${auth0?.idTokenClaims.value.__raw}`
          }}).catch((error) => error.data)

    await router.push('/dashboard')
  } finally {
    deletingForm.value = false
  }
}
</script>
