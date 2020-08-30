import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDgw6Iz00R6tItriJXgcu24eEGuCRqQLiM",
    authDomain: "todo-app-react-firebase-b4e3d.firebaseapp.com",
    databaseURL: "https://todo-app-react-firebase-b4e3d.firebaseio.com",
    projectId: "todo-app-react-firebase-b4e3d",
    storageBucket: "todo-app-react-firebase-b4e3d.appspot.com",
    messagingSenderId: "172375927014",
    appId: "1:172375927014:web:180681d8ea58e3172ef327",
    measurementId: "G-3XMYTW91QR"
})

const db = firebaseApp.firestore()

export default db