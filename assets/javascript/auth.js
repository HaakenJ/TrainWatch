const auth = firebase.auth(),
    user = firebase.auth().currentUser,
    provider = new firebase.auth.GoogleAuthProvider();



auth.onAuthStateChanged((user) => {
    if (user) {
        $('.main-content').show();
        $('.polymorph').hide();
        $('.aur-box').show();
        $('.login-box').hide();
        $('#current-user').show();
        console.log('logged in.');

        let name = user.displayName;
        $('#username').text(name);
    } else {
        $('.main-content').hide();
        $('.polymorph').show();
        $('.aur-box').hide();
        $('.login-box').show();
        $('#current-user').hide();
        console.log('Not logged in.');
    }
})

$('#login-submit').on('click', (event) => {
    event.preventDefault();
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