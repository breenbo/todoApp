// import Vue iot modify tasks
import Vue from 'vue';
import { uid, Notify } from 'quasar'; // tools to create unique id
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from './index';
import { firebaseDb, firebaseAuth } from '../boot/firebase';
import { showErrorMessage } from '../functions/show-error-message';
//import { log } from 'util';

@Module({
  dynamic: true,
  name: 'TaskStore',
  namespaced: true,
  store: Store
})
export default class TaskStore extends VuexModule {
  // use object, and never array, because firebase don't use array

  //{{{1 Task Store
  //{{{2 state
  public tasks: {
    [id: string]: {
      // explicit key type to use with sort function
      [key: string]: string | boolean;
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
    };
  } = {};
  //default sort method
  public sortBy = 'name';
  // track if tasks downloaded from firebase or not, to show/hide loader
  public tasksDownloaded = false;
  //}}}

  // getters
  //{{{2 getters

  //{{{3 tasksSorted
  public get tasksSorted(): {
    [id: string]: {
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
      [key: string]: string | boolean;
    };
  } {
    //eslint-disable-next-line
    let sortedTasks: {
      [id: string]: {
        name: string;
        completed: boolean;
        dueDate: string;
        dueTime: string;
        [key: string]: string | boolean;
      };
    } = {};
    // order key depending on name in object
    const keyOrdered: string[] = Object.keys(this.tasks);

    keyOrdered.sort((a, b) => {
      // TIPS : cast string type to use toLowerCase methods
      let taskAProp = this.tasks[a][this.sortBy] as string;
      taskAProp = taskAProp.toLowerCase();
      let taskBProp = this.tasks[b][this.sortBy] as string;
      taskBProp = taskBProp.toLowerCase();

      if (taskAProp > taskBProp) return 1;
      else if (taskAProp < taskBProp) return -1;
      else return 0;
    });
    // fill sortedTasks depending on ordered keys
    keyOrdered.forEach(key => {
      sortedTasks[key] = this.tasks[key];
    });

    return sortedTasks;
  }
  //}}}

  //{{{3 taskFiltered
  public get taskFiltered(): {
    [id: string]: {
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
    };
  } {
    // use sorted tasks as data base to reflect in all objects
    const sortedTasks: {
      [id: string]: {
        name: string;
        completed: boolean;
        dueDate: string;
        dueTime: string;
      };
    } = this.tasksSorted;

    let filteredTasks: {
      [id: string]: {
        name: string;
        completed: boolean;
        dueDate: string;
        dueTime: string;
      };
    } = {};

    if (this.searchField) {
      Object.keys(sortedTasks).forEach(key => {
        const task: {
          name: string;
          completed: boolean;
          dueDate: string;
          dueTime: string;
        } = sortedTasks[key];
        const taskNameLowercase: string = task.name.toLowerCase();
        const searchFieldLowercase: string = this.searchField.toLowerCase();
        if (taskNameLowercase.includes(searchFieldLowercase)) {
          filteredTasks[key] = task;
        }
      });
      return filteredTasks;
    }
    return sortedTasks;
  }
  //}}}

  //{{{3 tasksTodo
  public get tasksTodo(): {
    [id: string]: {
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
    };
  } {
    // use filteredTasks as base for todo : user see task filtered depending on his search
    const filteredTasks: {
      [id: string]: {
        name: string;
        completed: boolean;
        dueDate: string;
        dueTime: string;
      };
    } = this.taskFiltered;
    let tasks: {
      [id: string]: {
        name: string;
        completed: boolean;
        dueDate: string;
        dueTime: string;
      };
    } = {};

    Object.keys(filteredTasks).forEach(key => {
      const task: {
        name: string;
        completed: boolean;
        dueDate: string;
        dueTime: string;
      } = filteredTasks[key];

      if (!task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  }
  //}}}

  //{{{3 taskCompleted
  public get taskCompleted(): {
    [id: string]: {
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
    };
  } {
    const filteredTasks: {
      [id: string]: {
        name: string;
        completed: boolean;
        dueDate: string;
        dueTime: string;
      };
    } = this.taskFiltered;
    let tasks: {
      [id: string]: {
        name: string;
        completed: boolean;
        dueDate: string;
        dueTime: string;
      };
    } = {};

    Object.keys(filteredTasks).forEach(key => {
      const task: {
        name: string;
        completed: boolean;
        dueDate: string;
        dueTime: string;
      } = filteredTasks[key];

      if (task.completed) {
        tasks[key] = task;
      }
    });
    return tasks;
  }
  //}}}

  //}}}

  // only way to change datas in state
  //{{{2 Mutation
  @Mutation
  public updateTasks(taskUpdated: {
    id: string;
    updates: {
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
    };
  }) {
    Object.assign(this.tasks[taskUpdated.id], taskUpdated.updates);
  }
  @Mutation
  public deleteTask(taskId: string) {
    // Vue methods to delete in state, and keep it reactive
    Vue.delete(this.tasks, taskId);
  }
  @Mutation
  public addTask(payload: {
    taskId: string;
    task: {
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
    };
  }) {
    // Vue methods to add in state, and keep it reactive
    Vue.set(this.tasks, payload.taskId, payload.task);
  }
  @Mutation
  public setSortBy(sortBy: string): void {
    this.sortBy = sortBy;
  }
  @Mutation
  public setTasksDownloaded(value: boolean): void {
    this.tasksDownloaded = value;
  }
  @Mutation
  // clear tasks on user logout
  public clearTasks(): void {
    this.tasks = {};
  }
  //}}}

  // function to reacts to user interactions
  //{{{2 Actions
  @Action
  public updateTasksAction(taskUpdated: {
    id: string;
    updates: {
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
    };
  }) {
    //this.context.commit('updateTasks', taskUpdated);
    this.context.dispatch('fbUpdateTask', taskUpdated);
  }
  @Action
  public deleteTaskAction(taskId: string) {
    //this.context.commit('deleteTask', id);
    this.context.dispatch('fbDeleteTask', taskId);
  }
  @Action
  public addTaskAction(task: {
    name: string;
    completed: boolean;
    dueDate: string;
    dueTime: string;
  }) {
    const taskId = uid();
    const taskToAdd = {
      taskId: taskId,
      task: task
    };
    // commit mutation for early build
    //this.context.commit('addTask', payload);
    // dispatch action to add task to firebase
    this.context.dispatch('fbAddTask', taskToAdd);
  }
  @Action
  public setSortByAction(sortBy: string) {
    this.context.commit('setSortBy', sortBy);
  }
  @Action
  public fbReadDatas(): void {
    if (firebaseAuth.currentUser) {
      const userId = firebaseAuth.currentUser.uid;
      // access user tasks with its userId
      const userTasks = firebaseDb.ref(`tasks/${userId}`);

      // initial check for data -> remove loader when tasks are downloaded
      userTasks.once(
        'value',
        () => {
          this.context.commit('setTasksDownloaded', true);
        },
        error => {
          showErrorMessage(error.message);
          this.context.commit('AuthStore/setLoggedIn', false, { root: true });
        }
      );

      // child added
      userTasks.on('child_added', snapshot => {
        // get the tasks
        const task = snapshot.val();
        // create object to be passed to addTask mutation
        const newTask = {
          taskId: snapshot.key,
          // add task from firebase in payload
          task: task
        };

        // commit addTask to fill tasks object with firebase datas
        this.context.commit('addTask', newTask);
      });

      // child changed
      userTasks.on('child_changed', snapshot => {
        const task = snapshot.val();
        const updatedTask = {
          id: snapshot.key,
          updates: task
        };
        this.context.commit('updateTasks', updatedTask);
      });

      // child deleted
      userTasks.on('child_removed', snapshot => {
        const id = snapshot.key;
        this.context.commit('deleteTask', id);
      });
    }
  }
  @Action
  public fbAddTask(taskToAdd: {
    taskId: string;
    task: {
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
    };
  }): void {
    // need reference to the node to save task : Tasks/userId/taskId
    if (firebaseAuth.currentUser) {
      const userId = firebaseAuth.currentUser.uid;
      const taskRef = firebaseDb.ref(`tasks/${userId}/${taskToAdd.taskId}`);
      // send task in taskRef node, with error handling
      taskRef.set(taskToAdd.task, error => {
        if (error) {
          showErrorMessage(error.message);
        } else {
          // if no error, display a notification when task created
          Notify.create({ message: 'Task created', type: 'positive' });
        }
      });
    }
  }
  @Action
  public fbUpdateTask(taskUpdated: {
    id: string;
    updates: {
      name: string;
      completed: boolean;
      dueDate: string;
      dueTime: string;
    };
  }): void {
    if (firebaseAuth.currentUser) {
      const userId = firebaseAuth.currentUser.uid;
      const taskref = firebaseDb.ref(`tasks/${userId}/${taskUpdated.id}`);
      taskref.update(taskUpdated.updates, error => {
        if (error) {
          showErrorMessage(error.message);
        } else {
          const keys = Object.keys(taskUpdated.updates);
          if (!(keys.includes('completed') && keys.length == 1)) {
            // if no error, display a notification when task modified, but only if not completed
            Notify.create({ message: 'Task updated', type: 'positive' });
          }
        }
      });
    }
  }
  @Action
  public fbDeleteTask(taskId: string): void {
    if (firebaseAuth.currentUser) {
      const userId = firebaseAuth.currentUser.uid;
      const taskRef = firebaseDb.ref(`tasks/${userId}/${taskId}`);
      taskRef.remove(error => {
        if (error) {
          showErrorMessage(error.message);
        } else {
          // if no error, display a notification when task deleted
          Notify.create({ message: 'Task deleted', type: 'negative' });
        }
      });
    }
  }
  //}}}
  //}}}

  //{{{1 Search store
  public searchField: string = '';

  @Mutation
  public setSearchField(value: string) {
    this.searchField = value;
  }
  @Action
  public setSearchFieldAction(value: string) {
    this.context.commit('setSearchField', value);
  }
  //}}}
}
