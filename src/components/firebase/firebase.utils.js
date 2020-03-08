import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
        apiKey: "AIzaSyB7fZRW_XAKbvzSHeWmP0htx1Ej7Vfn6bQ",
        authDomain: "crwn-db-9f334.firebaseapp.com",
        databaseURL: "https://crwn-db-9f334.firebaseio.com",
        projectId: "crwn-db-9f334",
        storageBucket: "",
        messagingSenderId: "494230776687",
        appId: "1:494230776687:web:e599f59b7232e822"
};

firebase.initializeApp(config);


export const firestoreTest = () =>{
    const docRef = firestore.collection('users').doc('1PDJlk2jCVgvHRv2rGoxZX19Mz53')

      docRef.get().then(function(doc){
            return console.log(doc.data())
      })

}

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return; //checks if the userAuth object has something
      
        const userRef = firestore.doc(`users/${userAuth.uid}`);// gets the userRef from firestore
      
        const snapShot = await userRef.get();//gets the actual data from the userRef
      
        if (!snapShot.exists) { // if this is true meaning that the snapshot.exist is false
          const { displayName, email } = userAuth; //destructuring from userAuth
          const createdAt = new Date(); //creating a date from when this user is going to be introduce into the database
          try {
            await userRef.set({ //introducing the data to firestore
              displayName,
              email,
              createdAt,
              ...additionalData
            });
          } catch (error) {
            console.log('error creating user', error.message);
          }
        }
      
        return userRef; //returning user ref just in case we want to use it for something else
 };

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;