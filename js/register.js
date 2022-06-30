const Email = document.getElementById("username1");
const pass = document.getElementById("user-password1");
// const btnAuth = document.getElementById("btnAuth");
const form = document.getElementById("forms");
const formSign = document.getElementById("signForm");
const signUsername = document.getElementById("username");
const signUserPass = document.getElementById("user-password");
const logout = document.getElementById("logoutbtn");
const login = document.getElementById("loginbtn");
const signInbtn = document.getElementById('SignInBtn');
const signUpbtn = document.getElementById('SignUpBtn');
const registerbtn = document.getElementById('registerbtn');
const exampleModal1 = document.getElementById('exampleModal1');
const exampleModal = document.getElementById('exampleModal');

signInbtn.addEventListener('click',()=>{
  // login.classList.remove('d-none');
  // registerbtn.classList.add('d-none');
  // exampleModal.classList.add('d-none');
})

signUpbtn.addEventListener('click',()=>{
  // login.classList.add('d-none');
  // registerbtn.classList.remove('d-none');
  // exampleModal1.classList.add('d-none');
})


// console.log("hello")

function SignUp(e){

   e.preventDefault();

   let email = Email.value;
   let password = pass.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in 
      var user = userCredential.user;
      alert('created successfully');
    // ...
     })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('there is some error!!')
    // ..
    });
  
    Email.value='';
    pass.value='';
    // location.href="https://www.youtube.com/";

  }
  

forms.addEventListener("submit",SignUp);

function SignIn(e){

   e.preventDefault();

   let email = signUsername.value;
   let password = signUserPass.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in 
      var user = userCredential.user;
      console.log(user.uid);
      alert('successfully logged in!!');
      // logout.classList.remove('d-none');
      // login.classList.add('d-none');
    // ...
     })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert('there is some error!!')
    // ..
    });
  
    signUsername.value='';
    signUserPass.value='';
    // location.href="https://www.youtube.com/";

  }
  

  formSign.addEventListener("submit",SignIn);

  logout.addEventListener('click',()=>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      alert('logout successful.');
      // logout.classList.add('d-none');
      // login.classList.remove('d-none');
    }).catch((error) => {
      // An error happened.
    });
  });

  console.log(firebase.auth().currentUser);