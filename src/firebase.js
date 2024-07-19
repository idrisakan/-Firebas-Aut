import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updatePassword
} from "firebase/auth";
import toast from "react-hot-toast";
import { store } from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAS75wwvuVbuDfuhx7XCfjUEylrNGBB0_o",
  authDomain: "new-project-53a62.firebaseapp.com",
  projectId: "new-project-53a62",
  storageBucket: "new-project-53a62.appspot.com",
  messagingSenderId: "878228741772",
  appId: "1:878228741772:web:2b65c1b83dcc663e34e5a9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};
export const logout = async () => {
  try {
    const a = await signOut(auth);
    console.log("aa", a);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profil güncellendi");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Parolanız güncellendi");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(
      `Doğrulama maili ${auth.currentUser.email} adresine gönderildi`
    );
  } catch (error) {
    toast.error(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(loginHandle(user));
    const uid = user.uid;
  } else {
    store.dispatch(logoutHandle());
  }
});

export default app;
