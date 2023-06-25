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
            Overview
          </v-window-item>
          <v-window-item value="records">
            Records
          </v-window-item>
          <v-window-item value="settings">
            <div class="text-h5">Danger Zone</div>
            <v-list>
              <v-list-item title="Delete this form" subtitle="-">
                <v-list-item-action>
                  <v-dialog v-model="deleteDialog" width="auto">
                    <template v-slot:activator="{ props }">
                      <v-btn color="error" v-bind="props">Delete</v-btn>
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
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {useRouter} from "#app";

definePageMeta({
  layout: 'dashboard',
});

const tab = ref()
const deleteDialog = ref(false)
const deletingForm = ref(false)

const route = useRoute()
const router = useRouter()

try {
  const form = await $fetch(`http://localhost:8000/forms/${route.params.formName}`)
} catch (e) {
  await router.push('/dashboard')
}

async function deleteForm() {
  deletingForm.value = true

  try {
    await $fetch(`http://localhost:8000/forms/${route.params.formName}`, {method: 'DELETE'}).catch((error) => error.data)

    await router.push('/dashboard')
  } finally {
    deletingForm.value = false
  }
}
</script>
