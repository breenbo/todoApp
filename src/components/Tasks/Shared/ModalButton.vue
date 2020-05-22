<template>
  <q-card-actions align="right">
    <!--add type submit to submit form-->
    <q-btn :label="buttonAction" color="primary" type="submit" v-close-popup />
  </q-card-actions>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ModalButton extends Vue {
  @Prop(String) readonly buttonAction!: string;
}
</script>
