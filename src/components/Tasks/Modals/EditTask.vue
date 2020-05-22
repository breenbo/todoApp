<template>
  <q-card>
    <modal-header>Edit Task</modal-header>

    <!--encapsulate in form iot submit datas-->
    <q-form class="q-ma-sm" @submit="submitForm">
      <!--{{{1 input fields-->
      <q-card-section class="q-pt-none">
        <!--use sync to sync name with the children value-->
        <modal-task-name :name.sync="taskToSubmit.name" />

        <!--Select date with datePicker-->
        <q-slide-transition>
          <modal-due-date
            :due-date.sync="taskToSubmit.dueDate"
            v-if="taskToSubmit.name"
          />
        </q-slide-transition>

        <q-slide-transition>
          <modal-due-time
            :due-time.sync="taskToSubmit.dueTime"
            v-if="taskToSubmit.dueDate"
          />
        </q-slide-transition>
      </q-card-section>
      <!--}}}-->
      <modal-button :button-action="`Edit Task`"></modal-button>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
// import reusable element
import ModalHeader from '../Shared/ModalHeader.vue';
import ModalTaskName from '../Shared/ModalTaskName.vue';
import ModalDueDate from '../Shared/ModalDueDate.vue';
import ModalDueTime from '../Shared/ModalDueTime.vue';
import ModalButton from '../Shared/ModalButton.vue';
// import store iot use actions and mutation to change task
import { getModule } from 'vuex-module-decorators';
import TaskStore from '../../../store/task-store';

@Component({
  components: {
    ModalHeader,
    ModalTaskName,
    ModalDueDate,
    ModalDueTime,
    ModalButton
  }
})
export default class AddTask extends Vue {
  @Prop(String) readonly id!: string;
  @Prop(Object) readonly task!: {
    name: string;
    completed: boolean;
    dueDate: string;
    dueTime: string;
  };

  store = getModule(TaskStore);

  date: string = '';

  taskToSubmit: {
    name: string;
    completed: boolean;
    dueDate: string;
    dueTime: string;
  } = { name: '', completed: false, dueDate: '', dueTime: '' };

  // methods
  submitForm(): void {
    // send taskToSubmit to store
    this.store.updateTasksAction({
      id: this.id,
      updates: this.taskToSubmit
    });
  }
  //hooks
  // fill the form with the data from prop task when it appears (is mounted)
  mounted() {
    this.taskToSubmit = Object.assign({}, this.task);
  }
}
</script>
