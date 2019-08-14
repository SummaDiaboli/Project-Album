import auth0 from 'auth0-js'

class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: 'project-album.auth0.com',
            audience: 'https://project-album.auth0.com/userinfo',
            clientID: 'zisJJ3ZUskWxbynpCh5EYGZBK2CgJ8Qo',
            // redirectUri: 'http://localhost:3000/callback',
            // redirectUri: 'http://localhost:5000/callback',
            redirectUri: 'https://project-album.web.app/callback',
            responseType: 'id_token',
            scope: 'openid profile'
        })

        this.getProfile = this.getProfile.bind(this)
        this.handleAuthentication = this.handleAuthentication.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)
        this.signIn = this.signIn.bind(this)
        this.signOut = this.signOut.bind(this)
    }

    getProfile() {
        return this.profile
    }

    getIdToken() {
        return this.idToken
    }

    isAuthenticated() {
        return new Date().getTime() < this.expiresAt;
    }

    signIn() {
        this.auth0.authorize()
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err)
                if (!authResult || !authResult.idToken) {
                    return reject(err)
                }
                this.setSession(authResult)
                resolve()
            })
        })
    }

    setSession(authResult) {
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;
    }

    signOut() {
        // clear id token, profile, and expiration
        /* this.idToken = null
        this.profile = null
        this.expiresAt = null */
        this.auth0.logout({
            returnTo: 'https://project-album.web.app',
            clientID: 'zisJJ3ZUskWxbynpCh5EYGZBK2CgJ8Qo'
        })
    }

    silentAuth() {
        return new Promise((resolve, reject) => {
            this.auth0.checkSession({}, (err, authResult) => {
                if (err) return reject(err);
                this.setSession(authResult);
                resolve();
            });
        });
    }
}

const auth0Client = new Auth()

export default auth0Client;