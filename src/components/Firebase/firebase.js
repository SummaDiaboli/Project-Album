import app from 'firebase/app'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDm3RIC26l9ZwxxucR4nN3fq3PdNTvWZJM",
    authDomain: "project-album-6f4aa.firebaseapp.com",
    databaseURL: "https://project-album-6f4aa.firebaseio.com",
    projectId: "project-album-6f4aa",
    storageBucket: "",
    messagingSenderId: "372119285288",
    appId: "1:372119285288:web:a43e870c2f4c528a"
};

class Firebase {
    constructor() {
        app.initializeApp(config)

        this.auth = app.auth()
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password)

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    doSignOut = () => this.auth.signOut

    doResetPassword = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)
}

export default Firebase