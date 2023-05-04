
import {getApp, getApps, initializeApp} from 'firebase/app'
import { getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAu_OwRFu01pHaVvsPoE-0CaObmPlN0ia4",
    authDomain: "food-app-2fa3a.firebaseapp.com",
    databaseURL: "https://food-app-2fa3a-default-rtdb.firebaseio.com",
    projectId: "food-app-2fa3a",
    storageBucket: "food-app-2fa3a.appspot.com",
    messagingSenderId: "542599187748",
    appId: "1:542599187748:web:2269562f86c7b9cf4eb7b1"
  };

  const app = getApp.length > 0 ? getApps() : initializeApp(firebaseConfig)

  const Firestore = getFirestore(app)
  const Storage = getStorage(app)

  export {app, Firestore,Storage}