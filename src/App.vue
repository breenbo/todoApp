<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import SettingsStore from './store/settings-store';
import authStore from './store/auth-store';

@Component
export default class App extends Vue {
  settingsStore = getModule(SettingsStore);
  authStore = getModule(authStore);

  get getSettings() {
    return this.settingsStore.getSettingsAction;
  }
  get handleAuthStateChange() {
    return this.authStore.handleAuthStateChange;
  }

  mounted() {
    // fire functions when app opens
    this.getSettings();
    this.handleAuthStateChange();
  }
}
</script>

<style>
.text-strikethrough {
  text-decoration: line-through;
}
</style>
