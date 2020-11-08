import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyA_Ne7dPDDMMh70UgpcUTarKi52qd0TYYI",
  authDomain: "reactjs-indepth.firebaseapp.com",
  databaseURL: "https://reactjs-indepth.firebaseio.com",
  projectId: "reactjs-indepth",
  storageBucket: "reactjs-indepth.appspot.com",
  messagingSenderId: "711928460011",
  appId: "1:711928460011:web:175b2edd80d8ea24de04ae",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
