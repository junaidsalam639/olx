import { auth, db, storage } from "./firebase.mjs";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDocs, collection, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref, deleteObject, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);

        getDownloadURL(ref(storage, uid))
            .then((url) => {
                console.log(url);
            })
            .catch((error) => {
                // Handle any errors
            });



        const querySnapshot = await getDocs(collection(db, "cardAdd"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());

            var url1;
            getDownloadURL(ref(storage, doc.id))
                .then((url) => {

                    url1 = url

                    let add = document.getElementById('card-add-img').innerHTML += `
                  <div class="col mt-3">
                      <div class="card" style="width: 18rem;">
                          <img src="${url1}" class="card-img-top" alt="" id="img">
                          <div class="card-body">
                            <h5 class="card-title" id="title">Title: ${doc.data().text}</h5><hr>
                            <h6 class="card-text" id="desc">Desc: ${doc.data().text1}</h6><hr>
                            <h6 class="card-text" id="desc">Price: ${doc.data().price}</h6><hr>
                            <div class="btn">
                            <button onclick="edit('${doc.id}')" class='edit' data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                            <button onclick="dele('${doc.id}')" class='dele'>Delete</button>
                            </div>
                            </div>
                            </div>
                            </div>`

                })
                .catch((error) => {
                    // Handle any errors
                });
        });

        let pages = document.getElementById("hello");
        pages.innerHTML = `
        <li class="five" style="list-style: none;" id="page__">
            <button  id="card-page"><i class="fa-sharp fa-solid fa-plus"></i>
              <a href="" id="href" style="text-decoration: none;
            color: black; font-weight: bold;">SELL</a></button>
            </li>`
            document.getElementById('page__').addEventListener('click' , ()=>{
                window.location.href = './card.html'
            })

            const img = document.getElementById('img-img').innerHTML =
            ` <button onclick='img()' type="button" class="btn bg-dark text-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Logout</button></a>`


    } else {

    }
});


let pages = document.getElementById("page-page");
console.log(pages);
pages.addEventListener('click', () => {
    Swal.fire({
        icon: 'warning',
        title: 'Login / SingUp!',
        text: 'Login / SingUp Is Necessary!',
    }).then(()=>{
        location.reload();
    })
});






//   singout code
function img() {
    signOut(auth).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'SingOut',
            text: 'SingOut Successfully!',
        })
        const img = document.getElementById('img-img').innerHTML =
            ` <a href="./login.html">            
    <button type="button" class="btn bg-dark text-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">login</button></a>`
    }).catch((error) => {
        // An error happened.
    });

}

window.img = img


// Edit code
async function edit(e) {
    console.log(e);
    document.getElementById('btn-change').addEventListener('click', async () => {
        let title1 = document.getElementById('title1');
        let desc1 = document.getElementById('desc1');
        let price1 = document.getElementById('price1');


        if (title1.value == '' || desc1.value == '' || price1.value == '' || image1.value == '') {
            Swal.fire({
                icon: 'error',
                title: 'Input Fill',
                text: 'Please Fill The Input!',
            })
        } else {
            let image1 = document.getElementById('image1').files[0];
            console.log(image1);
            console.log(title1.value);
            console.log(desc1.value);
            console.log(price1.value);



            const washingtonRef = doc(db, "cardAdd", e);
            // Set the "capital" field of the city 'DC'
            await updateDoc(washingtonRef, {
                text: title1.value,
                text1: desc1.value,
                price: price1.value,
            });

            const storageRef = ref(storage, e);

            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, image1).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
            Swal.fire({
                icon: 'success',
                title: 'Edit',
                text: 'Edit Successfully!',
            })
                .then(() => {
                    location.reload();
                })
        }
    })
}
window.edit = edit


// Delete code
async function dele(e) {
    console.log(e);
    // Create a reference to the file to delete
    const desertRef = ref(storage, e);

    // Delete the file
    deleteObject(desertRef).then(() => {

    }).catch((error) => {
        console.log(error);
    });

    await deleteDoc(doc(db, "cardAdd", e));
    Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your file has been deleted.',
    }).then(() => {
        location.reload();
    })
}
window.dele = dele