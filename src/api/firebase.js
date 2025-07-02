import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBZLl0RLKL8r9U6m98WQakkAlpT_MQKY6g',
    authDomain: 'psychologistd.firebaseapp.com',
    projectId: 'psychologistd',
    storageBucket: 'psychologistd.firebasestorage.app',
    messagingSenderId: '12636047035',
    appId: '1:12636047035:web:a8847ad4f8a3f1abfe4b9e',
    measurementId: 'G-375NYKSS15',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;
