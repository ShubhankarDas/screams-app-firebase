const functions = require('firebase-functions');

const app = require('express')();
const FBAuth = require('./util/fbAuth');

const { 
  getAllScreams, 
  postOneScream, 
  getScream, 
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream
 } = require('./handlers/screams');
const { signup, login, uploadImage, addUserDetials, getAuthenticateUser } = require('./handlers/users');

// Scream routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);
app.delete('/scream/:screamId', FBAuth, deleteScream)
app.get('/scream/:screamId/like', FBAuth, likeScream)
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream)
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)

// User route
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetials);
app.get('/user', FBAuth, getAuthenticateUser);


// apis
exports.api = functions.region('asia-east2').https.onRequest(app);
