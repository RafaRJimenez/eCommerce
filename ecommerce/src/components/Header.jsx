import React, {useContext} from 'react';
import {AppContext} from '../App';
import { getAuth, signOut } from "firebase/auth";
import toast from 'react-hot-toast';
import { app } from '../firebase';

const auth = getAuth(app);

const Header = () => {
  const {setRoute, user, setUser} = useContext(AppContext);
  const doLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUser(null);
      toast('logged out');
      setRoute('home');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

    return (
        <header className="App">
        <h1  onClick={() => setRoute('home')}>Fireshopping v2</h1>
        <button
        onClick={() => setRoute('login')}
        >Login</button>
        {user ? 
          <button onClick={doLogout}>logout</button>
         : <button onClick={() => setRoute('register')}>
            Regístrate
        </button>
         }
        </header>
    );
}

export default Header;
