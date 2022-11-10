import { View, Text } from 'react-native'
import React, { createContext, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';



GoogleSignin.configure({
    webClientId: '103574021059-3f51oscnlqimqp6d2misuo3q81ms9kh8.apps.googleusercontent.com',
});

export const AuthContext = createContext()


const AuthProvider = (props) => {
    const dataUser = { uid: null, name: "nada", email: null, estado: null };
    const [user, setUser] = useState(dataUser)

    const googleSignIn = async () => {

        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const res = await auth().signInWithCredential(googleCredential);

        setUser({ uid: res.user.uid, name: res.user.displayName, email: res.user.email, photo: res.user.photoURL })
    }

    const googleSignOut = async () => {
        try {
            await GoogleSignin.signOut();
            setUser(dataUser)
            await GoogleSignin.revokeAccess();
            console.log("User sign-out successfully!")
        } catch (e) {
            console.log(e)
        }
    }

    const getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        console.log(currentUser)
    }

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        console.log(isSignedIn);
    }

    const createProduct = (codeProduct, description, numPiece, uso, name) => {
        try {
          firestore().collection(user.email).add({
            codeProduct,
            description,
            numPiece,
            uso,
            name
          }).then((docRef) => {
            setProduct(docRef.id)
            setisVisible(true)
          })
        } catch (error) {
          alert(error)
        }
      }
    return (
        <AuthContext.Provider value={{ user, googleSignIn, googleSignOut, getCurrentUser, isSignedIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider