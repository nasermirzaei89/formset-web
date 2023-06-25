<template>
  <v-app id="app">
    <v-app-bar class="px-4" scroll-behavior="elevate">
      <v-avatar color="green">FS</v-avatar>
      <v-app-bar-title>FormSet</v-app-bar-title>
      <v-spacer></v-spacer>
      Howdy {{ auth0?.user.value.given_name }}
      <v-btn variant="flat" :loading="auth0?.isLoading.value" @click="signOut">
        Sign Out
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot/>
    </v-main>
    <v-footer class="justify-center bg-grey-darken-3 pa-4">
      &copy; {{ new Date().getFullYear() }} FormSet Team.
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import {useAuth0} from '@auth0/auth0-vue';
import {useRoute} from 'nuxt/app'

const auth0 = process.client ? useAuth0() : undefined

const signIn = async () => {
  await auth0?.checkSession()
  if (!auth0?.isAuthenticated.value) {
    await auth0?.loginWithRedirect({
      appState: {
        target: useRoute().path,
      },
    })
  }
}

if (process.client) {
  signIn()
}

function signOut() {
  auth0?.logout()
}
</script>
