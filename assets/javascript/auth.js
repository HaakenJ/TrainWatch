const auth = firebase.auth(),
    user = firebase.auth().currentUser,
    provider = new firebase.auth.GoogleAuthProvider(),
    ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
    signInOptions: firebase.auth.GoogleAuthProvider.PROVIDER_ID
});



auth.onAuthStateChanged((user) => {
    if (user) {
        $('.aur-box').show();
        $('.login-box').hide();
        $('#sign-out-submit').show();
        console.log('logged in.');
    } else {
        $('.aur-box').hide();
        $('.login-box').show();
        $('#sign-out-submit').hide();
        console.log('Not logged in.');
    }
})

$('#login-submit').on('click', (event) => {
    event.preventDefault();
    console.log('login has been clicked.');
    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log(result);
    }).catch(function (error) {
        console.log(error);
    });
})

$('#sign-out-submit').on('click', (event) => {
    event.preventDefault();
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log('sign out successful.')
    }, function (error) {
        // An error happened.
        console.log(error);
    });
})