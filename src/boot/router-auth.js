// use LocalStorage to access to loggedIn value
import { LocalStorage } from 'quasar';

// change in router @ boot time
export default ({ router }) => {
  // hook fired every time user try to change page
  router.beforeEach((to, from, next) => {
    const loggedIn = LocalStorage.getItem('loggedIn');
    // send user to auth page if not logged in
    if (!loggedIn && to.path !== '/auth') {
      next('/auth');
    } else {
      next();
    }
  });
};
