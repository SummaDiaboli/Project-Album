// import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const express = require('express')
const bodyParser = require('body-parser')
// const cors = require('cors')

/* const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
} */

const helmet = require('helmet')
const morgan = require('morgan')
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
// const multer = require('multer')


// define the Express app
const app = express()

// the database
const albums = []

// enhance your app security with Helmet
app.use(helmet())

// use bodyParser to parse application/json content-type
app.use(bodyParser.json())

// enable all CORS requests
// app.use(cors({ origin: true }))
/* cors(req, res, () => { })
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); */

// log HTTP requests
app.use(morgan('combined'));

app.get('/', (req, res) => {

    const album = albums.map(album => ({
        id: album.id,
        title: album.title,
        description: album.description,
        pictures: album.pictures.length
    }))
    res.send(album)

})

// get a specific album
app.get('/:id', (req, res) => {
    const album = albums.filter(album => (album.id === parseInt(req.params.id)))
    if (album.length > 1) return res.status(500).send()
    if (album.length === 0) return res.status(404).send()
    res.send(album[0])
})

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://project-album.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'zisJJ3ZUskWxbynpCh5EYGZBK2CgJ8Qo',
    issuer: `https://project-album.auth0.com/`,
    algorithms: ['RS256']
})

// insert a newa album
app.post('/', checkJwt, (req, res, next) => {
    const { title, description } = req.body;
    const newAlbum = {
        id: albums.length + 1,
        title,
        description,
        pictures: [],
        author: req.user.name,
    }
    albums.push(newAlbum)
    res.status(200).send()
})

// insert a new picture in an album
app.post('/picture/:id', checkJwt, (req, res, next) => {
    const { picture } = req.body

    const album = albums.filter(album => (album.id === parseInt(req.params.id)))
    if (album.length > 1) return res.status(500).send()
    if (album.length === 0) return res.status(404).send()

    album[0].pictures.push({
        picture,
        author: req.user.name
    })

    res.status(200).send()
})

/* //Uploading files
const storage = multer.diskStorage({
    destination: './public/files',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage }).single('file')
app.post('/upload', checkJwt, (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).send()
        } else if (err) {
            return res.status(500).send()
        }
        return res.status(200).send(req.files)
    })
}) */

// start the server
/* app.listen(8081, () => {
    console.log('listening on port 8081')
}) */
/* app.listen(5001, () => {
    console.log('listening on port 5001')
}) */
exports.app = functions.https.onRequest(app)