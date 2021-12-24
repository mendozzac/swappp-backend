const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "swappp-6a90d.appspot.com",
});

const uploadFirebase = async (req, res, next) => {
  try {
    const bucket = admin.storage().bucket();
    await bucket.upload(req.file.path);
    await bucket.file(req.file.filename).makePublic();
    const fileURL = bucket.file(req.file.filename).publicUrl();
    req.body.image = fileURL;
    next();
  } catch (error) {
    error.code = 400;
    error.message = "Fallo en la carga del archivo";
  }
};

module.exports = uploadFirebase;
