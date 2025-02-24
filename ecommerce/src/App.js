
import './App.css';
import Header from './components/Header.jsx';
import { useState, createContext, useContext } from 'react';
import Home from './routes/Home.jsx';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import { Toaster } from 'react-hot-toast';
import Shopping from './routes/Shopping.jsx';

export const AppContext = createContext(null);

function App() {
  const [route, setRoute] = useState('home');
  const [user, setUser] = useState(null);
  return (
    <AppContext.Provider value={{route, setRoute, user, setUser}}>
    <Toaster />
   <Header></Header>
    {route === "home" && <Home />}
    {route === "login" && <Login />}
    {route === "register" && <Register />}
    {route === "shopping" && <Shopping />}
    {user && <div>user logged: {user.uid}</div>}
    <footer className='fixed-bottom' >
      <p>© 2021</p>
    </footer>
    </AppContext.Provider>
  );
}

export default App;
