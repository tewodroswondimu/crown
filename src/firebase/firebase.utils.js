import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyDVX4cYPuFitAGIvRpBCF0AZlFFg6aYt2Y",
authDomain: "crown-d28f3.firebaseapp.com",
projectId: "crown-d28f3",
storageBucket: "crown-d28f3.appspot.com",
messagingSenderId: "152756639433",
appId: "1:152756639433:web:4673f9c3b6b74b07a09f18",
measurementId: "G-HKPKT9HFYF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// setup google authentication 
const provider = new firebase.auth.GoogleAuthProvider(); 
provider.setCustomParameters({ prompt: 'select_account '});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    // if the user is not logged in, the return the function
    if (!userAuth) return; 

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get(); 

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date(); 

        // we use a try catch block to handle errors
        try {
            // the function will wait until we create a user object in firebase
            await userRef.set({
                displayName, 
                email,
                createdAt, 
                ...additionalData
            })
        } catch (error) {
            // if there are any errors in the try block the lines in
            // the catch block are executed
            console.log('error creating user', error.message);
        }
    }

    return userRef; 
}
