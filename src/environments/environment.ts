// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyAg57iPHyqcNwZI7MIFKcoIk4VehuycENE',
    authDomain: 'easyorder-6347f.firebaseapp.com',
    projectId: 'easyorder-6347f',
    storageBucket: 'easyorder-6347f.firebasestorage.app',
    messagingSenderId: '509935703594',
    appId: '1:509935703594:web:6b785805213a3ad8ecd553',
    measurementId: 'G-1G30N6HQ1F',
  },
};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
