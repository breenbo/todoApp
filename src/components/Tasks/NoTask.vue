<template>
  <q-banner class="bg-grey-3">
    <template v-slot:avatar>
      <q-icon name="check" color="primary" />
    </template>
    No task to do today
    <template v-slot:action>
      <!--emit event showAddTask on click : use global event bus from Quasar-->
      <q-btn flat color="primary" label="Add a task" @click="$root.$emit('showAddTask')" />
    </template>
  </q-banner>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class NoTask extends Vue {}
</script>
