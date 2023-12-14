import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDVSk_Bui-dYYpkjfzE3O1sTVlZfI7XHWQ",
  authDomain: "voting-87afb.firebaseapp.com",
  databaseURL: "https://voting-87afb-default-rtdb.firebaseio.com",
  projectId: "voting-87afb",
  storageBucket: "voting-87afb.appspot.com",
  messagingSenderId: "594884624998",
  appId: "1:594884624998:web:7235a80d1f9d5b814d23a7",
  measurementId: "G-R5HL0R0WX0",
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
