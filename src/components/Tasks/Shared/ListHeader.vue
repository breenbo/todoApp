<template>
  <q-banner dense :class="color" class="roundCorner">
    <span class="text-bold text-subtitle1">
      <slot></slot>
    </span>
  </q-banner>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ListHeader extends Vue {
  @Prop(String) readonly color!: string;
}
</script>
<style scoped>
.roundCorner {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
