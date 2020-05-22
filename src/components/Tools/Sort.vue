<template>
  <q-select
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    label="Sort by"
    class="col q-ml-sm"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getModule } from 'vuex-module-decorators';
import TaskStore from '../../store/task-store';

@Component
export default class Sort extends Vue {
  store = getModule(TaskStore);
  options: { label: string; value: string }[] = [
    {
      label: 'Name',
      value: 'name'
    },
    {
      label: 'Date',
      value: 'dueDate'
    }
  ];

  get sortBy() {
    return this.store.sortBy;
  }
  set sortBy(sortBy: string) {
    this.store.setSortByAction(sortBy);
  }
}
</script>

<style scoped>
.q-select {
  flex: 0 0 180px;
}
</style>
