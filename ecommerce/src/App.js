
import './App.css';
import Header from './components/Header.jsx';
import { useState, createContext, useContext } from 'react';
import { app, messaging } from './firebase/index.js';
import Home from './routes/Home.jsx';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import { Toaster, toast } from 'react-hot-toast';
import Shopping from './routes/Shopping.jsx';
import Footer  from './components/Footer.jsx';
import { onMessage } from 'firebase/messaging';
import TaskList from './routes/TaskList.jsx';

export const AppContext = createContext(null);


onMessage(messaging, (payload) => {
  console.log('Message received live right now ', payload);
  toast.custom((t) => (
    <div
      className={`toast toast-${t.visible ? 'visible' : 'hidden'}`}
      style={{ backgroundColor: t.visible ? '#333' : 'transparent' }}
    >
      <h2>{payload.notification.title}</h2>
      <p>{payload.notification.body}</p>
    </div>
  ));
  // ...
});

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
    {route === "tasklist" && <TaskList />}
    {user && <div>user logged: {user.uid}</div>}
    <Footer></Footer>
    </AppContext.Provider>
  );
}

export default App;
