<template>
  <q-card-section class="row">
    <div class="text-h6">
      <slot></slot>
    </div>
    <q-space />
    <q-btn flat round dense icon="close" v-close-popup></q-btn>
  </q-card-section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ModalHeader extends Vue {}
</script>
