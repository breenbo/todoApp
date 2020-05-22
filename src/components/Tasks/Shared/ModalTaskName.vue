<template>
  <div class="row q-mb-sm">
    <!--use value instead of v-model !
    get value with prop, need to send value to parent with @input="$emit('update:name',$event)"-->
    <!--use of custom directive-->
    <q-input
      ref="name"
      :value="name"
      @input="$emit('update:name', $event)"
      label="Task name"
      :rules="[val => !!val || 'Field required']"
      autofocus
      clearable
      class="col"
      v-select-all
    ></q-input>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { selectAll } from '../../../directives/directive-select-all';

@Component({
  directives: { selectAll }
})
export default class ModalTaskName extends Vue {
  @Prop(String) readonly name!: string;
}
</script>
