<template>
  <q-page padding>
    <q-list bordered padding class="q-mb-lg">
      <q-item-label header>Settings</q-item-label>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 hour time format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="secondary" v-model="show12HourTimeFormat" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="secondary" v-model="showTaskInOneList" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-list>
      <q-item-label header>More</q-item-label>

      <q-item to="/settings/help" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
      <q-item @click="visitOurWebsite" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Visit our website</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>

      <q-item @click="emailUs" tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Email Us</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// use store datas
import { getModule } from 'vuex-module-decorators';
import SettingsStore from '../store/settings-store';
// TIPS : use openURL iot migrate app in all quasar format
import { openURL } from 'quasar';

@Component({})
export default class PageSettings extends Vue {
  //{{{1. datas
  // get the store from TaskStore
  store = getModule(SettingsStore);
  //}}}
  //{{{1 methods
  visitOurWebsite() {
    openURL('http://www.google.com');
  }
  emailUs(): void {
    window.location.href =
      'mailto:hello@awesometodo.com?subject=AwesomeTodo Feedback';
  }
  //}}}
  //{{{1. computed
  get show12HourTimeFormat() {
    return this.store.settings.show12HourTimeFormat;
  }
  set show12HourTimeFormat(value: boolean) {
    this.store.set12HourTimeFormatAction(value);
  }
  get showTaskInOneList() {
    return this.store.settings.showTaskInOneList;
  }
  set showTaskInOneList(value: boolean) {
    this.store.setTaskInOneListAction(value);
  }
  //}}}
}
</script>
