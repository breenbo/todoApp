<template>
  <q-page>
    <!--wrap all elements in big div to 1. fill all page, 2. create scroll area in all page, for all width-->
    <div class="q-pa-md absolute full-width full-height column">
      <!--Display only if tasks downloaded from firebase-->
      <template v-if="tasksDownloaded">
        <div class="row q-mb-lg">
          <search></search>
          <sort></sort>
        </div>

        <q-scroll-area class="scrollAreaTask">
          <!--{{{1 no-result, no-tasks and todo-->
          <div class="relative-position">
            <!--Transition on the same place-->
            <transition
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <no-task
                v-if="
                  !Object.keys(tasksTodo).length &&
                    !searchField &&
                    !showTaskInOneList
                "
              />
            </transition>

            <transition
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <no-result v-if="!Object.keys(tasksTodo).length && searchField" />
            </transition>
            <transition
              appear
              enter-active-class="animated zoomIn absolute-top"
              leave-active-class="animated fadeOutRight absolute-top"
            >
              <div v-if="Object.keys(tasksTodo).length">
                <list-header :color="`bg-orange-4`" v-if="!showTaskInOneList"
                  >ToDo</list-header
                >
                <q-list bordered separator>
                  <task
                    v-for="(task, key) in tasksTodo"
                    :key="key"
                    :task="task"
                    :id="key"
                  ></task>
                </q-list>
              </div>
            </transition>
          </div>
          <!--}}}-->

          <!--{{{1 completed tasks-->
          <transition
            appear
            enter-active-class="animated fadeInUp"
            leave-active-class="animated hinge"
          >
            <!--bind class : remove margin if showTaskInOneList is true-->
            <div
              v-if="Object.keys(tasksCompleted).length"
              :class="{ 'q-my-lg': !showTaskInOneList }"
            >
              <list-header
                class="q-mt-lg"
                :color="`bg-green-4`"
                v-if="!showTaskInOneList"
                >Completed</list-header
              >
              <q-list bordered separator>
                <task
                  v-for="(task, key) in tasksCompleted"
                  :key="key"
                  :task="task"
                  :id="key"
                ></task>
              </q-list>
            </div>
          </transition>
          <!--}}}-->
        </q-scroll-area>

        <!--{{{1 button add task -->
        <!--no-pointer-event to enable click beside button : need reenable pointer in button with all-pointer-events -->
        <div
          class="absolute-bottom text-center q-mb-lg q-mr-lg no-pointer-events"
        >
          <q-btn
            round
            color="secondary"
            size="24px"
            icon="add"
            @click="showAddTask = true"
            class="all-pointer-events"
          ></q-btn>
        </div>
        <!--}}} -->
      </template>
      <!--else display a loader-->
      <template v-else>
        <span class="absolute-center">
          <q-spinner-pie color="accent" size="30vw" />
        </span>
      </template>
    </div>
    <!--{{{1 dialog add task -->
    <q-dialog v-model="showAddTask" persistent>
      <add-task />
    </q-dialog>
    <!--}}}-->
  </q-page>
</template>

<script lang="ts">
//{{{1 imports
import Vue from 'vue';
import Component from 'vue-class-component';

// use store datas
import { getModule } from 'vuex-module-decorators';
import TaskStore from '../store/task-store';
import SettingsStore from '../store/settings-store';

// {{{2 import custom components
import task from '../components/Tasks/Task.vue';
import addTask from '../components/Tasks/Modals/AddTask.vue';
import listHeader from '../components/Tasks/Shared/ListHeader.vue';
import noTask from '../components/Tasks/NoTask.vue';
import search from '../components/Tools/Search.vue';
import sort from '../components/Tools/Sort.vue';
import noResult from '../components/Tasks/NoResult.vue';
//}}}
//}}}

@Component({
  // {{{1 declare the custom components
  components: {
    task,
    addTask,
    listHeader,
    noTask,
    search,
    noResult,
    sort
  }
  //}}}
})
export default class PageTodo extends Vue {
  //{{{1 datas
  showAddTask: boolean = false;
  // get the store from TaskStore
  store = getModule(TaskStore);
  settingsStore = getModule(SettingsStore);
  //}}}

  //{{{ computed
  get searchField(): string {
    return this.store.searchField;
  }

  // get the datas : computed property
  get tasksTodo(): {
    [id: string]: {
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
    };
  } {
    return this.$store.getters['TaskStore/tasksTodo'];
  }

  get tasksCompleted(): {
    [id: string]: {
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
    };
  } {
    return this.$store.getters['TaskStore/taskCompleted'];
  }
  get showTaskInOneList(): boolean {
    return this.settingsStore.settings.showTaskInOneList;
  }
  get tasksDownloaded(): boolean {
    return this.store.tasksDownloaded;
  }
  //}}}

  // {{{1 hooks
  // listen on the global Event Bus from Quasar
  mounted() {
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true;
    });
  }
  //}}}
}
</script>
<style scoped>
.scrollAreaTask {
  display: flex;
  flex-grow: 1;
}
</style>
