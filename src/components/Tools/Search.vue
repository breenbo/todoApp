<template>
  <q-input
    v-model="searchField"
    @keyup.esc="searchField = ''"
    label="Search"
    class="col"
    v-select-all
  >
    <template v-slot:before>
      <q-icon name="search" />
    </template>

    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
    </template>
  </q-input>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// use store datas
import { getModule } from 'vuex-module-decorators';
import TaskStore from '../../store/task-store';
// use custom directive
import { selectAll } from 'src/directives/directive-select-all';

@Component({
  directives: {
    selectAll
  }
})
export default class Search extends Vue {
  //searchStore = getModule(SearchStore);
  store = getModule(TaskStore);

  // get data from store : computed method
  // don't use getter because no manipulation before get it
  // use getters to manipulate datas before getting them
  get searchField(): string {
    return this.store.searchField;
  }
  set searchField(term: string) {
    this.store.setSearchFieldAction(term);
  }
}
</script>

<style scoped>
</style>
