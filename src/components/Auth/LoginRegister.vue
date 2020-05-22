<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="secondary" />
        </template>
        {{ tab | titleCase }} to access your ToDo anywhere !
        <span class="loggedInTrick">{{ loggedIn }}</span>
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        class="col"
        color="secondary"
        label="Email"
        stack-label
        v-model="formData.email"
        ref="email"
        :rules="[
          val => isValidEmailAdress(val) || 'Please enter a valid email'
        ]"
        lazy-rules
      />
    </div>
    <div class="row q-mb-xl">
      <q-input
        color="secondary"
        type="password"
        class="col"
        label="Password"
        stack-label
        v-model="formData.password"
        ref="password"
        :rules="[
          val => val.length >= 6 || 'Please enter at least 6 characters.'
        ]"
        lazy-rules
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </form>
</template>

<script lang="ts">
//{{{1 imports
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import AuthStore from '../../store/auth-store';
// show loader on login/register
import { Loading } from 'quasar';
//}}}

@Component({
  //{{{1 filters
  filters: {
    titleCase(word: string): string {
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    }
    //// TIPS : filter must return something
  }
  //}}}
})
export default class LoginRegister extends Vue {
  //{{{1 props
  @Prop({ default: 'login' }) readonly tab!: string;
  //}}}
  //{{{1 datas
  // get the store from AuthStore
  authStore = getModule(AuthStore);

  formData: { email: string; password: string } = {
    email: '',
    password: ''
  };
  //}}}
  //{{{1 computed
  get loggedIn() {
    return this.authStore.loggedIn;
  }
  //}}}
  //{{{1 methods
  isValidEmailAdress(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  // cast this.$refs.email as any element
  submitForm(): void {
    (this.$refs.email as any).validate();
    (this.$refs.password as any).validate();
    if (
      !(this.$refs.email as any).hasError &&
      !(this.$refs.password as any).hasError
    ) {
      if (this.tab == 'login') {
        this.authStore.loginUser(this.formData);
        Loading.show();
      } else {
        // send formData object to authStore
        this.authStore.registerUser(this.formData);
        Loading.show();
      }
    }
  }

  //}}}
  //{{{1 hooks
  // route to home page or auth, depending if loggedIn. Use page updated by account icon
  updated() {
    if (this.loggedIn) {
      Loading.hide();
      //eslint-disable-next-line
      this.$router.push('/').catch(err => {});
    }
  }

  //}}}
}
</script>

<style scoped>
.loggedInTrick {
  display: none;
}
</style>
