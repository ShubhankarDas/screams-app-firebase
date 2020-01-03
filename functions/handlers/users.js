const { admin, db } = require('../util/admin');

const { firebaseConfig } = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const { validateSignUpData, validateLoginData, reduceUserDetails } = require('../util/validations');

// login signup
exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  }

  const { valid, errors } = validateSignUpData(newUser);

  if (!valid) return res.status(400).json(errors);

  const noImg = 'no-img.webp'

  let token, userId;
  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if(doc.exists){
        return res.status(400).json({ handle: "This handle is already taken."});
      }else {
        return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(tokenId => {
      token = tokenId;
      const userCredetials = {
        userHandle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
        userId
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredetials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch(err => {
      if(err.code === "auth/email-already-in-use"){
        return res.status(400).json({ email: 'Email is already in user.' });
      }else {
        console.error(err);
        return res.status(500).json({ error: err.code });
      }
    }); 
};

// login user
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({token});
    })
    .catch(err => {
      console.log(err);
      if (err.code === 'auth/wrong-password') {
        res.status(403).json({general: "Wrong credentials, please try again"})
      }
      else return res.status(500).json({error: err.code});
    })
}

//user details
exports.addUserDetials = (req, res) => {
  let userDetials = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.handle}`)
    .update(userDetials)
    .then(() => res.json({ message: "Details added successfully" }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    })
}

// Get any user details
exports.getUserDetails = (req, res) => {
  let userData = {}
  db.doc(`/users/${req.params.handle}`).get()
    .then(doc => {
      if(doc.exists) {
        userData.user = doc.data();
        return db.collection('screams').where('userHandle', '==', req.params.handle)
          .orderBy('createdAt', 'desc').get()
      }
      return res.status(404).json({ error: 'User not found' })
    })
    .then(data => {
      userData.screams = [];
      data.forEach(doc => {
        userData.screams.push({
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          screamId: doc.id
        })
      })
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({error: err.code});
    })
}

// get own user details
exports.getAuthenticateUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.handle}`).get()
    .then(doc => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db.collection('likes').where('userHandle', '==', req.user.handle).get();
      }
    })
    .then(data => {
      userData.likes = [];
      data.forEach(doc => {
        userData.likes.push(doc.data());
      });
      return db.collection('notifications').where('recipient', '==', req.user.handle)
        .orderBy('createdAt', 'desc').limit(10).get()
      
    })
    .then(data => {
      userData.notifications = [];
      data.forEach(doc => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          createdAt: doc.data().createdAt,
          screamId: doc.data().screamId,
          read: doc.data().read,
          type: doc.data().type,
          notificationId: doc.id
        })
      })
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: err.code});
    })
}

//  Upload profile image
exports.uploadImage = (req, res) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busBoy = new BusBoy({ headers: req.headers });

  let imageFileName, imageToBeUploaded = {};

  busBoy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype != 'image/jpeg' && mimetype != 'image/png') {
      return res.status(400).json({ errorr: "Wrong filetype submitted" });
    }

    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    imageFileName = `${new Date().getTime()}.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
  });

  busBoy.on('finish', () => {
    admin.storage().bucket(firebaseConfig.storageBucket).upload(imageToBeUploaded.filePath, {
      resumable: false,
      metadata: {
        metadata: {
          contentType: imageToBeUploaded.mimetype
        }
      }
    })
    .then(() => {
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
      return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
    })
    .then(() => {
      return res.json({ message: "Image uploaded successfully" });
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
  });
  busBoy.end(req.rawBody);
}

// mark notifications read
exports.markNotificationsRead = (req, res) => {
  let batch = db.batch();

  req.body.forEach(notificationId => {
    const notification = db.doc(`/notifications/${notificationId}`)
    batch.update(notification, { read: true });
  });
  batch.commit()
    .then(() => {
      return res.json({ message: 'Notifications marked read' })
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
}
