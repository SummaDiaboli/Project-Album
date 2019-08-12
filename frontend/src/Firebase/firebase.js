import app from 'firebase/app'
import 'firebase/auth'
// import 'firebase/database'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyDm3RIC26l9ZwxxucR4nN3fq3PdNTvWZJM",
    authDomain: "project-album-6f4aa.firebaseapp.com",
    databaseURL: "https://project-album-6f4aa.firebaseio.com",
    projectId: "project-album-6f4aa",
    storageBucket: "project-album-6f4aa.appspot.com",
    messagingSenderId: "372119285288",
    appId: "1:372119285288:web:a43e870c2f4c528a"
}

class Firebase {
    constructor() {
        app.initializeApp(config)

        this.auth = app.auth()
        // this.db = app.database()
        this.store = app.firestore()
    }

    // *** Auth API ***

    createUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password)

    signInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    signOut = () => this.auth.signOut()

    resetPassword = email => this.auth.sendPasswordResetEmail(email)

    updatePassword = password =>
        this.auth.currentUser.updatePassword(password)

    createUserDisplayName = username =>
        this.auth.currentUser.updateProfile({ displayName: username })

    displayUserEmail = () =>
        this.auth.currentUser.email

    getUid = () =>
        this.auth.currentUser.uid


    // *** User API ***

    user = (uid) => this.store.collection(`users`).doc(`${uid}`)

    /* user = uid => this.db.ref(`users/${uid}`)

    users = () => this.db.ref('users') */

}

export default Firebase