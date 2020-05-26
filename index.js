var db = firebase.firestore();
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
	callbacks: {
		signInSuccessWithAuthResult: function(authResult, redirectUrl) {
			return true;
		},
		uiShown: function() {
			document.getElementById('loader').style.display = 'none';
		}
	},
	signInFlow: 'popup',
	signInSuccessUrl: 'http://clawley.co.uk/main',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
			signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
		}
	]
};

ui.start('#firebaseui-auth-container', uiConfig);

if (ui.isPendingRedirect()) {
	ui.start('#firebaseui-auth-container', uiConfig);
}

if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
	ui.start('#firebaseui-auth-container', uiConfig);
}
	

function deleteUsers() {
	var deleteFn = firebase.functions().httpsCallable('recursiveDelete');
    deleteFn({ path: "users/4aSLpCh9fbtqr86leJkH" })
        .then(function(result) {
            console.log('Delete success: ' + JSON.stringify(result));
        })
        .catch(function(err) {
            console.log('Delete failed, see console,');
            console.warn(err);
        });
}

function signInAsAdmin() {
    var tokenFn = firebase.functions().httpsCallable('mintAdminToken');
    tokenFn({ uid: 'user1234' }).then(function (res) {
        return firebase.auth().signInWithCustomToken(res.data.token);
    });
}

// db.collection("users").add({
	// first: "Test",
	// last: "Name",
	// born: 1815
// })
// .then(function(docRef) {
	// console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
	// console.error("Error adding document: ", error);
// });

// db.collection("users").add({
	// first: "Alan",
	// middle: "Mathison",
	// last: "Turing",
	// born: 1912
// })
// .then(function(docRef) {
	// console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
	// console.error("Error adding document: ", error);
// });


// db.collection("users").onSnapshot({
	// includeMetadataChanges: true
	// }, function(querySnapshot) {
		// var users = [];
		// querySnapshot.forEach(function(doc) {
			// users.push(doc.data().first);
			// console.log("Test");
			// var h1 = document.createElement("H1");
			// var user = document.createTextNode(doc.data().first + " " + doc.data().last);
			// h1.appendChild(user);
			// document.body.appendChild(h1);
		// });
// });