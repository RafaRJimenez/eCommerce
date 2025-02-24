import React, {useState, useContext} from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';
import toast from 'react-hot-toast';
import { AppContext } from '../App';

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const Login = () => {
   const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
       const {setUser} = useContext(AppContext);
    const doLogin = () => {
        signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log(token, user);
    setUser(user);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log(errorCode, errorMessage, email, credential);
  });
};
    const signInWithEmail = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user);
            setUser(user);
            toast(`user ${email} signed in`);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
    };
    return (
        <div>
            <h1>Login</h1>
            <h2>haz click para hacer login</h2>
            <button onClick={doLogin}>Login</button>
            <form onSubmit={signInWithEmail}>
            <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
