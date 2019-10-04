const auth = firebase.auth(),
    user = firebase.auth().currentUser,
    provider = new firebase.auth.GoogleAuthProvider();


$(document).ready(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            $('.aur-box').show();
            console.log('logged in.');
        } else {
            $('.aur-box').hide();
            console.log('Not logged in.');
        }
    })
})

$('#login-submit').on('click', (event) => {
    event.preventDefault();
    console.log('login has been clicked.');
    firebase.auth().signInWithRedirect(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
})