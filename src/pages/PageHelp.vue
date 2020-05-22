<template>
  <q-page padding>
    <q-btn
      color="secondary"
      flat
      label="back"
      icon="chevron_left"
      to="/settings"
    />
    <h5>How to use Awesome ToDo</h5>
    <p>
      Sit sequi reiciendis labore porro consectetur Quam repudiandae ut at eaque
      totam, sit illum reprehenderit sit? Architecto omnis cumque repellendus
      voluptatibus odio, pariatur. Quia excepturi odit recusandae tempore quas
      cupiditate Dolorem praesentium quod mollitia neque officiis? At laborum
      qui a dicta unde obcaecati magnam? Sit itaque doloremque incidunt quasi
      saepe Odio nam delectus dolorem veniam itaque Reiciendis aspernatur
      voluptate dolore beatae quisquam itaque Ipsam fuga maxime sit tempore quos
      molestiae? Cum animi impedit exercitationem quisquam rerum molestias at.
      Facere alias pariatur facilis asperiores officiis Nostrum nesciunt
      similique fuga deleniti obcaecati? Repudiandae sunt voluptatem dicta totam
      nesciunt ea? Rem laborum tempora?
    </p>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// use store datas
import { getModule } from 'vuex-module-decorators';
import TaskStore from '../store/task-store';

@Component
export default class PageHelp extends Vue {
  //{{{1. datas
  // get the store from TaskStore
  store = getModule(TaskStore);
  //}}}
}
</script>

<style scoped>
</style>
