<template>
  <v-app id="app">
    <v-app-bar class="px-4" scroll-behavior="elevate">
      <v-avatar color="green">FS</v-avatar>
      <v-app-bar-title>FormSet</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="auth0?.isAuthenticated?.value" :loading="auth0?.isLoading?.value" to="/dashboard" color="primary" variant="flat">
        Dashboard
      </v-btn>
      <v-btn v-else @click="signIn" :loading="auth0?.isLoading?.value" color="primary" variant="flat">
        Sign In
      </v-btn>
    </v-app-bar>
    <v-main class="pt-8">
      <v-sheet class="bg-green">
        <v-container>
          <v-row class="justify-center py-4 py-sm-12">
            <v-col cols="12" class="text-center">
              <div class="text-h4 text-sm-h3 text-md-h2">Forms for Everywhere</div>
              <p class="text-subtitle-1">Add forms to your static website without a backend. </p>
            </v-col>
            <v-col cols="12" sm="10" md="9" lg="8" xl="6">
              <pre class="border pa-4 bg-black overflow-x-auto"><code>{{ code }}</code></pre>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
      <v-sheet>
        <v-container>
          <v-row class="justify-center py-4 py-sm-12">
            <v-col cols="12" class="text-center pb-8">
              <div class="text-h4 text-sm-h3 my-4">Features</div>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="text-center pa-8 fill-height" variant="tonal" color="primary">
                <v-icon size="96">mdi-security</v-icon>
                <v-card-title class="text-h5">
                  Secure
                </v-card-title>
                <v-card-text class="text-body-1">
                  Protect your form from spams
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="text-center pa-8 fill-height" variant="tonal" color="primary">
                <v-icon size="96">mdi-infinity</v-icon>
                <v-card-title class="text-h5">
                  Free
                </v-card-title>
                <v-card-text class="text-body-1">
                  Submit unlimited records for free
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="text-center pa-8 fill-height" variant="tonal" color="primary">
                <v-icon size="96">mdi-connection</v-icon>
                <v-card-title class="text-h5">
                  Channels
                </v-card-title>
                <v-card-text class="text-body-1">
                  Get submitted forms in your Email, Messenger, ...
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
      <v-sheet color="grey-lighten-5">
        <v-container>
          <v-row class="justify-center py-4 py-sm-12">
            <v-col cols="12" class="text-center pb-8">
              <div class="text-h4 text-sm-h3 my-4">How to Use</div>
            </v-col>
            <v-col cols="12" sm="6" lg="3">
              <v-card class="text-center pa-8 fill-height" variant="tonal" color="primary" @click="">
                <v-icon size="96">mdi-language-html5</v-icon>
                <v-card-title class="text-h5">
                  HTML
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" lg="3">
              <v-card class="text-center pa-8 fill-height" variant="tonal" color="primary" @click="">
                <v-icon size="96">mdi-cached</v-icon>
                <v-card-title class="text-h5">
                  AJAX
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" lg="3">
              <v-card class="text-center pa-8 fill-height" variant="tonal" color="primary" @click="">
                <v-icon size="96">mdi-react</v-icon>
                <v-card-title class="text-h5">
                  React
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" lg="3">
              <v-card class="text-center pa-8 fill-height" variant="tonal" color="primary" @click="">
                <v-icon size="96">mdi-vuejs</v-icon>
                <v-card-title class="text-h5">
                  Vue
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
      <v-sheet>
        <v-container>
          <v-row class="justify-center py-4 py-sm-12">
            <v-col cols="12" class="text-center pb-8">
              <div class="text-h4 text-sm-h3 my-4">Ready?</div>
              <v-btn v-if="auth0?.isAuthenticated?.value" :loading="auth0?.isLoading?.value" to="/dashboard" class="mt-8" size="x-large" variant="flat" color="primary">Start for Free</v-btn>
              <v-btn v-else @click="signIn" :loading="auth0?.isLoading?.value" class="mt-8" size="x-large" variant="flat" color="primary">Start for Free</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
      <v-sheet color="grey-darken-2">
        <v-container>
          <v-row class="justify-center py-4 py-sm-12">
            <v-col cols="12" sm="10" md="9" lg="8" xl="6" class="text-center pb-8">
              <div class="text-h4 text-sm-h3 my-4">Contact Us</div>
              <v-form>
                <v-text-field label="Email Address" type="email"/>
                <v-textarea label="Message"/>

                <v-btn variant="flat" color="primary" size="large" prepend-icon="mdi-send">Send</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-main>
    <v-footer class="justify-center bg-grey-darken-3 pa-4">
      &copy; {{ new Date().getFullYear() }} FormSet Team.
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const code = `<form action="https://formset.io/f/{formName}" method="post">
  <label for="email">Email Address</label>
  <input name="email" id="email" type="email">
  <button type="submit">Submit</button>
</form>`

const auth0 = process.client ? useAuth0() : undefined

const signIn = () => {
  auth0?.checkSession()
  if (!auth0?.isAuthenticated.value) {
    auth0?.loginWithRedirect({
      appState: {
        target: useRoute().path,
      },
    })
  }
}
</script>