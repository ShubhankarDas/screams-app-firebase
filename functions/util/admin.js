const admin = require('firebase-admin');

const { serviceAccountConfig } = require('../util/config');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountConfig)
});

const db = admin.firestore();

module.exports = { admin, db };
