const firebaseConfig = {
    apiKey: "AIzaSyBKpwK_4fVTEIDiHDWS-Iq4fQZxZZIZUQg",
    authDomain: "playmusic-c865b.firebaseapp.com",
    projectId: "playmusic-c865b",
    storageBucket: "playmusic-c865b.appspot.com",
    messagingSenderId: "954779405956",
    appId: "1:954779405956:web:6d1a264a8a325c61cd7cd1",
    measurementId: "G-79237DB2LP",
  };
  
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);


const Email = document.getElementById("email");
const pass = document.getElementById("password");
// const btnAuth = document.getElementById("btnAuth");
const form = document.getElementById("myForm");


console.log("hello")

function SignIn(e){

   e.preventDefault();

   let email = Email.value;
   let password = pass.value;

   console.log(email,password);

   firebase.auth().signInWithEmailAndPassword(email, password)
   .then((userCredential) => {
     // Signed in
     var user = userCredential.user;
     // ...
     alert("Logged in successfully!!");
   })
   .catch((error) => {
     var errorCode = error.code;
     var errorMessage = error.message;
     alert(errorMessage);
   });
  
    Email.value='';
    pass.value='';
   
  }
  

  form.addEventListener("submit",SignIn);