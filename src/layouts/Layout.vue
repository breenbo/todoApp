<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          class="gt-xs"
        />
        <q-toolbar-title class="absolute-center">
          Awesome ToDo
        </q-toolbar-title>
        <q-btn
          v-if="!loggedIn"
          flat
          icon="account_circle"
          class="absolute-right"
          label="Login"
          to="/auth"
        />
        <q-btn
          v-else
          flat
          icon="account_circle"
          class="absolute-right"
          label="Logout"
          @click="authStore.logoutUser"
        />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.id"
          :label="nav.title"
          :icon="nav.icon"
          :to="nav.link"
        ></q-route-tab>
      </q-tabs>
    </q-footer>

    <!-- breakpoint to hide drawer on smaller screen -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary"
      class="gt-xs"
    >
      <q-list dark>
        <q-item-label header class="text-grey-4">
          Navigation
        </q-item-label>
        <essential-link
          v-for="link in navs"
          :key="link.title"
          v-bind="link"
          class="text-grey-4"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
//{{{1 Imports
import Component from 'vue-class-component';
import EssentialLink from 'components/EssentialLink.vue';
import Vue from 'vue';
// import authStore to display LogIn/LogOut buttons
import authStore from '../store/auth-store';
import { getModule } from 'vuex-module-decorators';
//}}}

@Component({
  // import other components here
  components: {
    EssentialLink
  }
})
export default class MainLayout extends Vue {
  //{{{1 datas
  authStore = getModule(authStore);

  leftDrawerOpen = false;
  navs = [
    {
      title: 'Todo',
      caption: 'Todo page',
      icon: 'list',
      link: '/'
    },
    {
      title: 'Settings',
      caption: 'Set things',
      icon: 'settings',
      link: '/settings'
    }
  ];
  //}}}
  //{{{1 computed
  get loggedIn(): boolean {
    return this.authStore.loggedIn;
  }
  //}}}
  //{{{1 hooks
  // route to home page or auth, depending if loggedIn. Use page updated by account icon
  updated() {
    if (!this.loggedIn) {
      //eslint-disable-next-line
      this.$router.replace('/auth').catch(err => {});
    }
  }
  //}}}
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 598px) {
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: white !important;
  }
}
</style>
