import { auth, db, storage } from "./firebase.mjs";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { addDoc , collection } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


document.getElementById('singup').addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let number = document.getElementById('number').value;
    if (email == '' || password == '' || name == '' || age == '' || number == '' || file.value == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Error!',
            text: 'Please Fill The Input!',
        })
    }
    else {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const uid = user.uid;
                console.log(user.uid);
                console.log(uid);

                try {
                    const docRef = await addDoc(collection(db, "users-Data"), {
                        name: name,
                        age: age,
                        number: number,
                    });
                    console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

                const storageRef = ref(storage, uid);
                
                // 'file' comes from the Blob or File API
                let file = document.getElementById("file").files[0];
                uploadBytes(storageRef, file).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    setTimeout(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successs',
                            text: 'SingUp successfully!',
                        }).then(()=>{
                            location.href = './login.html'
                        })
                    }, 2000);
                });


                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
            });
    }
})

