import firebase from 'firebase';

const config = {
	/* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
	apiKey: 'AIzaSyAQ0iAJFnGW-kqwMFkJPo2Tnhsx-Pd7fto',
	authDomain: 'reactjs-firebase-tuto.firebaseapp.com',
	databaseURL: 'https://reactjs-firebase-tuto.firebaseio.com',
	projectId: 'reactjs-firebase-tuto',
	storageBucket: 'reactjs-firebase-tuto.appspot.com',
	messagingSenderId: '428212538651'
};
const fire = firebase.initializeApp(config);
export default fire;
