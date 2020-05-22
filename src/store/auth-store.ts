import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from './index';
import { firebaseAuth } from '../boot/firebase';
// use localStorage to store if user is logged in or not
import { LocalStorage } from 'quasar';
import { showErrorMessage } from '../functions/show-error-message';

@Module({
  dynamic: true,
  name: 'AuthStore',
  namespaced: true,
  store: Store
})
export default class AuthStore extends VuexModule {
  //{{{1 state
  public loggedIn: boolean = false;
  //}}}

  // getters
  //{{{1 getters
  /*
     public get taskSorted(): {
        return something
     }
  */

  //}}}

  // only way to change datas in state
  //{{{1 Mutation
  @Mutation
  public setLoggedIn(value: boolean): void {
    this.loggedIn = value;
  }
  //}}}

  // function to reacts to user interactions
  //{{{1 Actions
  @Action
  public registerUser(user: { email: string; password: string }) {
    firebaseAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(response => {
        console.log('Success', response);
      })
      .catch(error => {
        showErrorMessage(error.message);
      });
  }
  @Action
  public loginUser(user: { email: string; password: string }) {
    firebaseAuth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(response => {
        console.log('Success!', response);
      })
      .catch(error => {
        showErrorMessage(error.message);
      });
  }
  @Action
  public logoutUser() {
    firebaseAuth.signOut();
    // commit setTasksDownloaded from taskStore to enable main loader on logout
    //this.context.dispatch('TaskStore/setTasksDownloadedFalse', null, {root:true})
  }
  @Action
  // change loggedIn everytime state change, iot show logIn/logOut icons
  public handleAuthStateChange(): void {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // store in local storage if user logged In
        LocalStorage.set('loggedIn', true);
        // change loggedIn value
        this.context.commit('setLoggedIn', true);
        // read datas from firebase
        this.context.dispatch('TaskStore/fbReadDatas', null, { root: true });

        // route user on tood page on login
      } else {
        // block fired when user logout
        // commit mutation from another module
        this.context.commit('TaskStore/setTasksDownloaded', false, {
          root: true
        });
        LocalStorage.set('loggedIn', false);
        this.context.commit('setLoggedIn', false);
        this.context.commit('TaskStore/clearTasks',null,{root:true})
      }
    });
  }
  //}}}
}
