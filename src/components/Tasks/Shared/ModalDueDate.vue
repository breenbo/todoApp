<template>
  <div class="row">
    <q-input
      :value="dueDate"
      label="Due date"
      class="col"
      clearable
      @input="$emit('update:dueDate', $event)"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              :value="dueDate"
              @input="$emit('update:dueDate', $event)"
              mask="YYYY/MM/DD"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ModalTaskName extends Vue {
  @Prop(String) readonly dueDate!: string;
}
</script>
