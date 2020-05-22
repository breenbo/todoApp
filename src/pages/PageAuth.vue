<template>
  <q-page padding>
    <q-card flat class="registerCard">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="grey-8"
        indicator-color="secondary"
        align="justify"
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-register :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
//{{{1. imports
import Vue from 'vue';
import Component from 'vue-class-component';
// use store datas
import { getModule } from 'vuex-module-decorators';
import TaskStore from '../store/task-store';
import LoginRegister from '../components/Auth/LoginRegister.vue';
//}}}

@Component({
  //{{{1. declare components
  components: { LoginRegister }
  //}}}
})

// if prop : export default class %%% extends taskProp {}
export default class PageAuth extends Vue {
  //{{{1. datas
  // get the store from TaskStore
  store = getModule(TaskStore);
  tab = 'login';
  //}}}
}
</script>

<style scoped>
.registerCard {
  width: 80%;
  margin: 0 auto;
}
</style>
