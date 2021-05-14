import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAzg-jlQqc4QR7hVnZLXUMMJUfT37WL51w',
  authDomain: 'ecommerce-dev-b35e6.firebaseapp.com',
  projectId: 'ecommerce-dev-b35e6',
  storageBucket: 'ecommerce-dev-b35e6.appspot.com',
  messagingSenderId: '771910720625',
  appId: '1:771910720625:web:832fe4937df9a361964fd0',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Exports

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
