<template>
  <div class="row q-mb-sm">
    <q-input
      :value="dueTime"
      label="Due time"
      class="col"
      clearable
      @input="$emit('update:dueTime', $event)"
    >
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy
            ref="qTimeProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-time
              :value="dueTime"
              format24h
              @input="$emit('update:dueTime', $event)"
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
  @Prop(String) readonly dueTime!: string;
}
</script>
