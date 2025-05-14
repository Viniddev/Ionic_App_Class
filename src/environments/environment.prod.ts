// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

export const environment = {
  production: true,
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
