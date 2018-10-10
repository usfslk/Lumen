import firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyA9suzkSr5LpM24JJ5V0PLjexfit5ZzrFo',
	authDomain: 'lumen-6834a.firebaseapp.com',
	databaseURL: 'https://lumen-6834a.firebaseio.com',
	projectId: 'lumen-6834a',
	storageBucket: 'lumen-6834a.appspot.com',
	messagingSenderId: '44693182619'
};
const fire = firebase.initializeApp(config);
export default fire;
