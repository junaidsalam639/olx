  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  import { getDatabase  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
  import { getFirestore  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  import { getStorage   } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC7X3E0tYXHV3WFK-HjGBx1Z_gEBpmJMLw",
    authDomain: "budget-app-367c9.firebaseapp.com",
    projectId: "budget-app-367c9",
    storageBucket: "budget-app-367c9.appspot.com",
    messagingSenderId: "103739685793",
    databaseURL: "https://user-9d4be-default-rtdb.firebaseio.com/",
    appId: "1:103739685793:web:1012816aa96809df8ee9e0"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const database = getDatabase(app);
 export const db = getFirestore(app);
 export const storage = getStorage(app);