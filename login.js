import { auth, db } from "./firebase.mjs";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


document.getElementById('login').addEventListener('click', () => {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  if (email == '' || password == '') {
    Swal.fire({
      icon: 'warning',
      title: 'Error!',
      text: 'Please Fill The Input!',
  })
  }
  else {
    console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login successfully!',
        }).then(() => {
          location.href = './index.html'
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your SingUp Is First!',
        }).then(() => {
          location.href = './singup.html'
        })
      });
  }

})







