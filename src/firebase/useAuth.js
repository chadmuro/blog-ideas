import { auth } from './config';

export const authLogin = (email, password) => {
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
    });
}

export const authSignup = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
    });
}

export const authLogout = () => {
    auth.signOut().then(() => {
        console.log('logged out');
    });
}