import firebase from 'firebase';

const config = {
	/* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
	apiKey: 'AIzaSyASUrViv2WgQe4f_sgs82k-v5dLwZCtCOE',
	authDomain: 'event-b82a3.firebaseapp.com',
	databaseURL: 'https://event-b82a3.firebaseio.com',
	projectId: 'event-b82a3',
	storageBucket: 'event-b82a3.appspot.com',
	messagingSenderId: '426380789324'
};
const fire = firebase.initializeApp(config);
export default fire;
