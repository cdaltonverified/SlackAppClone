import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAjjAO4t_VeoZkiiWaEvS348CzsVotuVjU",
    authDomain: "slack-app-clone-6353e.firebaseapp.com",
    projectId: "slack-app-clone-6353e",
    storageBucket: "slack-app-clone-6353e.appspot.com",
    messagingSenderId: "418212707079",
    appId: "1:418212707079:web:03fcc35cb03cb6d2bee3a2",
    measurementId: "G-ME8B8FFVHW"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;