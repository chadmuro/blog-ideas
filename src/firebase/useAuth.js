import { auth } from './config';

export const authLogin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
}

export const authSignup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
}

export const authLogout = () => {
    auth.signOut().then(() => {
        console.log('logged out');
    });
}