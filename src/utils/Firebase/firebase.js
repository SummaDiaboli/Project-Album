import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

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
        this.store = app.firestore()
        this.storage = app.storage()

        this.exposeapp = app.firestore
    }

    // *** Auth API *** //

    createUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password)

    sendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        })

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


    // *** Merge Auth and DB User API *** //
    onAuthListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .get()
                    .then(snapshot => {
                        const dbUser = snapshot.data()

                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser
                        }

                        next(authUser)
                    })
            } else {
                fallback()
            }
        })


    // *** User API *** //

    user = (uid) => this.store.collection(`users`).doc(`${uid}`)

    // *** Album API ***
    newAlbum = (uid) => this.store.collection('albums').doc(`${uid}`).collection('userAlbums').doc()

    getAlbum = (uid, albumId) => this.store.collection('albums').doc(`${uid}`).collection('userAlbums').doc(`${albumId}`)

    albums = uid => this.store.collection('albums').doc(`${uid}`).collection('userAlbums')


    /* user = uid => this.db.ref(`users/${uid}`)

    users = () => this.db.ref('users') */

    // *** Storage API *** //

    getStorageRef = (uid, albumTitle, filename, file) => this.storage.ref().child(`${uid}/${albumTitle}/${filename}/${file}`)

    // getMetaData = (uid, albumTitle, filename, file) => this.storage.ref(`${uid}/${albumTitle}/${filename}`).child(`${file}`).getMetadata()

    uploadFile = (uid, albumTitle, filename, file) => this.storage.ref(`${uid}/${albumTitle}/${filename}`).put(file)

    downloadURL = (uid, albumTitle, filename, file) => this.storage.ref(`${uid}/${albumTitle}/${filename}`).child(`${file}`).getDownloadURL()

    // updateFilesDatabase = url => this.app.firebase.firestore.FieldValue.arrayUnion(url)

    // * Updates files in the firestore
    updateFiles = url => this.exposeapp.FieldValue.arrayUnion(url)
}

export default Firebase