firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        document.getElementById("user_para").innerHTML =  email_id;
  
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
  
  }

  function signup(){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    const promise = auth.createUserWithEmailAndPassword(userEmail, userPass);
    promise.catch(e => alert(e.message));

  }
  
  function logout(){
    firebase.auth().signOut();
  }


  function makeAvatar(){
    location.reload();
  }
  
  var form = document.getElementById("form")

  form.addEventListener("submit", function(event){
      
      event.preventDefault()

      var url = "https://picsum.photos/285/100"

      var image = document.getElementById('img')

      image.src = url;
      
  })

  async function generateJoke(){
      //call api
      const response = await fetch("https://icanhazdadjoke.com/", {
          headers: {
              'Accept' : 'application/json'
          }
      })

      const generatedJoke = await response.json()
      alert(generatedJoke.joke)
  }

