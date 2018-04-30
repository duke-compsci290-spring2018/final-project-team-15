// use Firebase as our database
import Firebase from 'firebase'

// configure and connect to database
var config = {
    apiKey: "AIzaSyB449TZG4sds9XuDoIalxUtNGwWkyRG0GM",
    authDomain: "cs-290-final.firebaseapp.com",
    databaseURL: "https://cs-290-final.firebaseio.com",
    projectId: "cs-290-final",
    storageBucket: "cs-290-final.appspot.com",
    messagingSenderId: "1013644465157"
};
var fbApp = Firebase.initializeApp(config)

// global reference to remote database app
export const db = fbApp.database()
// global reference to remote storage
export const storageRef = fbApp.storage().ref()

export const compsRef = db.ref('competitions');
export const choicesRef = db.ref('compChoices');
export const winsRef = db.ref('wins');
export const picsRef = db.ref('pictures');
export const adminsRef = db.ref('admins');

// create useful endpoints within the database
//export const imagesRef = db.ref('images')
