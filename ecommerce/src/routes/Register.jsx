import React, {useState, useContext} from 'react';
import { toast } from 'react-hot-toast';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AppContext } from '../App';

const auth = getAuth();


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setRoute, setUser} = useContext(AppContext);
    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    console.log(user);
    toast(`user ${email} signed up`);
    setEmail('');
    setPassword('');
    setUser(user);	
    setRoute('home');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ..
  });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        createUser();
    }
    return (
        <div>
            <h1>Regístrate para tener acceso</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Regístrate</button>
            </form>
        </div>
    );
}

export default Register;
