importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyC8FsxZw5yqH7sq0QjZHvRGs_HjP4nwi4U",
    authDomain: "trompsburg-buurtwag.firebaseapp.com",
    projectId: "trompsburg-buurtwag",
    storageBucket: "trompsburg-buurtwag.appspot.com",
    messagingSenderId: "925271604221",
    appId: "1:925271604221:web:dee9a4d22c05e4aecbb794",
    measurementId: "G-DDDG2HTSEJ"
});
// Necessary to receive background messages:
const messaging = firebase.messaging();

// Optional:
// messaging.onBackgroundMessage((message) => {
//   console.log("onBackgroundMessage", message);
// });