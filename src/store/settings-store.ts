import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import Store from './index';
// use localstorage to make settings persistents
// TIPS : don't forget to import LocalStorage in quasar.conf.js !!!!!!!!!!!!
import { LocalStorage } from 'quasar';

@Module({
  dynamic: true,
  name: 'SettingsStore',
  namespaced: true,
  store: Store
})
export default class SettingsStore extends VuexModule {
  //{{{1 state
  public settings: {
    show12HourTimeFormat: boolean;
    showTaskInOneList: boolean;
  } = {
    show12HourTimeFormat: true,
    showTaskInOneList: false
  };
  //}}}

  // getters
  //{{{1 getters
  // get all settings object
  //public get getSettings():{showHourTimeFormat:boolean} {
  //return this.settings;
  //}
  //}}}

  // only way to change datas in state
  //{{{1 Mutation
  @Mutation
  public set12HourTimeFormat(value: boolean): void {
    this.settings.show12HourTimeFormat = value;
  }
  @Mutation
  public setTaskInOneList(value: boolean): void {
    this.settings.showTaskInOneList = value;
  }
  @Mutation
  public getSettings(value: {
    show12HourTimeFormat: boolean;
    showTaskInOneList: boolean;
  }): void {
    Object.assign(this.settings, value)
  }
  //}}}

  // function to reacts to user interactions
  //{{{1 Actions
  @Action
  public set12HourTimeFormatAction(value: boolean): void {
    this.context.commit('set12HourTimeFormat', value);
    // TIPS : use dispatch to use action in another action
    this.context.dispatch('saveSettings');
  }
  @Action
  public setTaskInOneListAction(value: boolean): void {
    //LocalStorage.set('settings', this.settings);
    this.context.commit('setTaskInOneList', value);
    this.context.dispatch('saveSettings');
  }
  @Action
  public saveSettings(): void {
    LocalStorage.set('settings', this.settings);
  }
  @Action
  public getSettingsAction(): void {
    const settings = LocalStorage.getItem('settings');
    if (settings) {
      this.context.commit('getSettings', settings);
    }
  }
  //}}}
}
