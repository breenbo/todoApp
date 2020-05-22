// import something here
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBt5ExoyQ2B_VHNgTYNZJlAwO1H84bDGtY',
  authDomain: 'awesome-todo-aaad2.firebaseapp.com',
  databaseURL: 'https://awesome-todo-aaad2.firebaseio.com',
  projectId: 'awesome-todo-aaad2',
  storageBucket: 'awesome-todo-aaad2.appspot.com',
  messagingSenderId: '893257959470',
  appId: '1:893257959470:web:8e95494c4a27fbe17c77bf'
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
// connect App to database
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }
