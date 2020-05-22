<template>
  <q-item
    v-ripple
    :class="task.completed ? 'bg-green-1 ' : ''"
    clickable
    v-touch-hold:1000.mouse="showEditTaskModal"
    @click="
      store.updateTasksAction({
        id: id,
        updates: { completed: !task.completed }
      })
    "
  >
    <!--{{{1 item-section checkbox -->
    <q-item-section side>
      <q-checkbox class="no-pointer-events" :value="task.completed" />
    </q-item-section>
    <!--}}}-->

    <!--{{{1 item-section task name-->
    <q-item-section>
      <!--use filter to highlight search result-->
      <q-item-label
        :class="{ 'text-strikethrough': task.completed }"
        v-html="$options.filters.searchHighlight(task.name, searchField)"
      ></q-item-label>
    </q-item-section>
    <!--}}}-->

    <!--{{{1 item-section due date-->
    <q-item-section side>
      <div class="row">
        <div class="column justify-center">
          <q-icon
            name="event"
            size="24px"
            class="q-mr-sm"
            v-if="task.dueDate"
          />
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">
            <!--use filter to format date-->
            {{ task.dueDate | niceDate }}
          </q-item-label>
          <q-item-label caption class="row justify-end">
            <small>{{ taskDueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>
    <!-- }}}-->

    <!--{{{1 item-section edit/delete button-->
    <!--click.stop to not propagate the click on the parent-->
    <q-item-section side>
      <div class="row">
        <q-btn
          flat
          round
          color="primary"
          icon="edit"
          @click.stop="showEditTaskModal"
        ></q-btn>
        <q-btn
          flat
          round
          color="red"
          icon="delete"
          @click.stop="promptToDelete(id)"
        ></q-btn>
      </div>
    </q-item-section>
    <!--}}}-->

    <!--{{{1 dialog edit task -->
    <q-dialog v-model="showEditTask" persistent>
      <!--pass task and id to edit-task iot fill the dialog-->
      <edit-task :task="task" :id="id" />
    </q-dialog>
    <!--}}}-->
  </q-item>
</template>

<script lang="ts">
  //import Vue from 'vue';
  //import Component from 'vue-class-component';
  import { Vue, Component, Prop } from 'vue-property-decorator';
  //
  import editTask from './Modals/EditTask.vue';
  // import store iot use actions and mutation to change task
  import { getModule } from 'vuex-module-decorators';
  import TaskStore from '../../store/task-store';
  import SettingsStore from '../../store/settings-store';
  // import date to format date
  import { date } from 'quasar';
  // eslint-disable-next-line
  const { formatDate } = date;

  @Component({
    components: { editTask },
    //{{{1 filter
    filters: {
      niceDate(value: string): string {
        return date.formatDate(value, 'Do MMMM');
      },
      // TIPS : filter must return something
      searchHighlight(value: string, search: string): string {
        // if search, return the value surrounded by span with color class
        if (search) {
          let searchRegExp = new RegExp(search, 'ig');
          return value.replace(searchRegExp, match => {
            return `<span class="bg-yellow-6">${match}</span>`;
          });
        }
        return value;
      }
    }
    //}}}
  })
  export default class Tasks extends Vue {
    //{{{1 props
    @Prop(String) readonly id!: string;
    @Prop(Object) readonly task!: {
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
    };
    //}}}

    //{{{1 datas
    showEditTask: boolean = false;
    store = getModule(TaskStore);
    settingsStore = getModule(SettingsStore);
    //}}}

    //{{{1 methods
    promptToDelete(id: string): void {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Really delete task ?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.store.deleteTaskAction(id);
        })
        .onCancel(() => {});
    }
    showEditTaskModal(): void {
      this.showEditTask = true;
    }
    //}}}

    //{{{1 computed
    get searchField() {
      return this.store.searchField;
    }
    get taskDueTime() {
      if (this.settingsStore.settings.show12HourTimeFormat) {
        return date.formatDate(
          `${this.task.dueDate} ${this.task.dueTime}`,
          'h:mm A'
        );
      } else {
        return this.task.dueTime;
      }
    }
    //}}}
  }
</script>
