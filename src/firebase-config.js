import { initializeApp } from 'firebase/app';
import { 
    GoogleAuthProvider,
    getAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCoTsNdUA4iFktvN_OUsc3TIDpaB--XkHw",
  authDomain: "loginfirebase-d3f44.firebaseapp.com",
  databaseURL: "https://loginfirebase-d3f44-default-rtdb.firebaseio.com",
  projectId: "loginfirebase-d3f44",
  storageBucket: "loginfirebase-d3f44.appspot.com",
  messagingSenderId: "1010714738989",
  appId: "1:1010714738989:web:4de7dc326dd60d257cd3a4",
  measurementId: "G-JRM6ZCWQ33"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db};