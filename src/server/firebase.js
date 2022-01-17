import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";

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
getAnalytics();

export default firebase;