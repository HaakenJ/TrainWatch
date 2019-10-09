const auth = firebase.auth(),
    user = firebase.auth().currentUser,
    provider = new firebase.auth.GoogleAuthProvider();

$(document).ready(() => {
    if (user) {
        $('#login-page').hide();
    }
})

auth.onAuthStateChanged((user) => {
    if (user) {
        $('#login-page').hide();
        $('.main-content').show();
        $('.aur-box').show();
        $('.login-box').hide();
        $('#current-user').show();
        $('#sign-out-submit').show();
        console.log('logged in.');

        let name = user.displayName;
        $('#username').text(name);
    } else {
        $('.main-content').hide();
        $('#login-page').show();
        $('#svg-one').attr('points', '1920,1080 0,1080 0,0 432.59,0 1920,0');
        $('#svg-two').attr('points', '1920,2160 0,2160 0,2160 1254,2160 1920,2160');
        $('.aur-box').hide();
        $('.login-box').show();
        $('#current-user').hide();
        $('#sign-out-submit').hide();
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