
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwoSR8MeeboozwcNbr3zsVmzR-IETM66s",
  authDomain: "friend-9fe49.firebaseapp.com",
  projectId: "friend-9fe49",
  storageBucket: "friend-9fe49.firebasestorage.app",
  messagingSenderId: "301940443148",
  appId: "1:301940443148:web:e5cfa078be3cc8ba208629",
  measurementId: "G-FVDNBDW82M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Analytics if in browser environment
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
