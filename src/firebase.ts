import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
    apiKey: "AIzaSyBNP28c3vsIihTrYVOzkOG_YuXgHGZvbTw",
    authDomain: "ll-bygg.firebaseapp.com",
    projectId: "ll-bygg",
    storageBucket: "ll-bygg.appspot.com",
    messagingSenderId: "1072602321840",
    appId: "1:1072602321840:web:bfb60075079e215666bc75"
})

const firestore = firebase.app().firestore()
const auth = firebase.app().auth()

export {
    firestore, auth, firebase as default
}

