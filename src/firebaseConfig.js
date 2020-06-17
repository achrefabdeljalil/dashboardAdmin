import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBs8L4pmHV0kT6147spu1apbLwZqy2vNYQ",
  authDomain: "wassalli-84ff0.firebaseapp.com",
  databaseURL: "https://wassalli-84ff0.firebaseio.com",
  projectId: "wassalli-84ff0",
  storageBucket: "wassalli-84ff0.appspot.com",
  messagingSenderId: "347075854123",
  appId: "1:347075854123:web:ccccc672933e28fd4a0f6e"
};
export const app = firebase.initializeApp(firebaseConfig);
//export const pathLocation = "/localisation";