<template>
  <q-card>
    <modal-header>Add Task</modal-header>

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
      <modal-button :button-action="`Create Task`"></modal-button>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
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
  store = getModule(TaskStore);
  buttonAction = 'Create Task';

  date = '';
  taskToSubmit: {
    name: string;
    completed: boolean;
    dueDate: string;
    dueTime: string;
  } = { name: '', completed: false, dueDate: '', dueTime: '' };

  submitForm(): void {
    // send taskToSubmit to store
    this.store.addTaskAction(this.taskToSubmit);
  }
}
</script>
