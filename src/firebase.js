import firebase from 'firebase/app'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-XlcU1CixDk0P1TSsNMtaQFlmslKpO5Y",
    authDomain: "calender-eaf7c.firebaseapp.com",
    databaseURL: "https://calender-eaf7c.firebaseio.com",
    projectId: "calender-eaf7c",
    storageBucket: "calender-eaf7c.appspot.com",
    messagingSenderId: "162001627327",
    appId: "1:162001627327:web:c84d348b4fb8b67cb1be0a",
    measurementId: "G-2P2X0Q0TSZ"
  };

firebase.initializeApp(firebaseConfig)

export default firebase