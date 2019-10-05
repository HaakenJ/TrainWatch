const auth = firebase.auth(),
    user = firebase.auth().currentUser,
    provider = new firebase.auth.GoogleAuthProvider(),
    ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
        signInOptions: firebase.auth.GoogleAuthProvider.PROVIDER_ID
      });


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
    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log(result);
    }).catch(function (error) {
        console.log(error);
    });
})