import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
	apiKey: 'AIzaSyCyzG3O1VDRDbnbzb1wrblViVnyyuGuBmk',
	authDomain: 'blog-post-ideas.firebaseapp.com',
	databaseURL: 'https://blog-post-ideas.firebaseio.com',
	projectId: 'blog-post-ideas',
	storageBucket: 'blog-post-ideas.appspot.com',
	messagingSenderId: '263408276238',
	appId: '1:263408276238:web:377df5168409058d7b3d5f',
	measurementId: 'G-JP01HGNNPD',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };