// listen for auth status changes
auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
      db.collection('Pins').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          setUpFrontEnd([user])  
          renderPin(doc);
           
        });
    });
    
    } else {
      setUpFrontEnd();
      //loginWarning.innerText =('<h5 class=center-align>please sign in to see the pin info</h5>');
      renderPin([]);
     
    }
  })
  
  // signup
  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
  
    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
  });
  
  // logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });
  
  // login
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
  
    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    });
  
  });