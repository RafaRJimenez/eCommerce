// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const vapidKey = "BGpXgQiWoryMV7s6Zi3cvaLhs1f4d4ATjapbVv3wDYe8YRCKI-hoYHqBmlF4-Gao4cwetG_Ry1urxQykAp8sdJU";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANBCDjjmlFLdR_S7L8BBUJ6Lrve7MkAxU",
  authDomain: "fir-shopping-bc544.firebaseapp.com",
  projectId: "fir-shopping-bc544",
  storageBucket: "fir-shopping-bc544.firebasestorage.app",
  messagingSenderId: "8732389479",
  appId: "1:8732389479:web:18e1ddd7f0c3888ffc24c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Register the service worker
navigator.serviceWorker.register('/firebase-messaging-sw.js')
  .then((registration) => {
    console.log('Service Worker registered with scope:', registration.scope);
    // Request permission to send notifications
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // Get the token
        getToken(messaging, { vapidKey, serviceWorkerRegistration: registration })
          .then((currentToken) => {
            if (currentToken) {
              console.log('currentToken:', currentToken);
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          });
      } else if (permission === 'denied') {
        console.log('Notification permission denied.');
      } else {
        console.log('Unable to get permission to notify. Permission has been blocked.');
      }
    }).catch((err) => {
      console.log('An error occurred while requesting permission. ', err);
    });
  }).catch((err) => {
    console.log('Service Worker registration failed: ', err);
  });

// Handle incoming messages
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then((registration) => {
      registration.showNotification(notificationTitle, notificationOptions);
    });
  }
});

export { app };