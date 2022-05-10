const functions = require("firebase-functions");
const Firestore = require("@google-cloud/firestore");
const PROJECTID = "catstagram-893e9";

const db = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});

exports.writeHello = functions.https.onCall(() => {
  db.collection("foo").doc("bar").set(
    {
      zip: "banana",
    },
    { merge: true }
  );
});

exports.getTimeStamp = functions.https.onCall(() => {
  return Date.now();
});
