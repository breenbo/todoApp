<template>
  <q-banner class="bg-grey-3 q-mb-lg">
    <template v-slot:avatar>
      <q-icon name="search" color="primary" />
    </template>
    No result found in today's tasks for '{{ searchField }}'
    <template v-slot:action>
      <!--emit event showAddTask on click : use global event bus from Quasar-->
      <!--<q-btn flat color="primary" label="Add a task" @click="$root.$emit('showAddTask')" />-->
    </template>
  </q-banner>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { getModule } from 'vuex-module-decorators';
import TaskStore from '../../store/task-store';

@Component
export default class NoTask extends Vue {
  store = getModule(TaskStore);

  get searchField(): string {
    return this.store.searchField;
  }
}
</script>
