// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js')


const firebaseConfig = {
  apiKey: "AIzaSyANBCDjjmlFLdR_S7L8BBUJ6Lrve7MkAxU",
  authDomain: "fir-shopping-bc544.firebaseapp.com",
  projectId: "fir-shopping-bc544",
  storageBucket: "fir-shopping-bc544.firebasestorage.app",
  messagingSenderId: "8732389479",
  appId: "1:8732389479:web:18e1ddd7f0c3888ffc24c2"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});