import React, { useState, useEffect } from 'react';
import Home from "./pages/home";
import Login from "./pages/Loginpage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientHome from './pages/Clienthome';
import ArtistHome from './pages/ArtistHome';
import Gallery from './pages/Gallery';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';
import LoginForm from './components/LoginFrom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function App() {
  const [role, setRole] = useState(getCookie('Role'));
  const [name, setName] = useState(getCookie('name'));
  const [logged, setLogged] = useState(getCookie('Logged'));
  useEffect(() => {
    const interval = setInterval(() => {
      const newRole = getCookie('Role');
      const newName = getCookie('name');
      const newLogged = getCookie('Logged');
      if (newRole !== role) {
        setRole(newRole);
      }
      if (newName !== name) {
        setName(newName);
      }
      if (newLogged !== logged) {
        setLogged(newLogged);
      }
    }, 1000); // Check for changes every second

    return () => clearInterval(interval);
  }, [role]);
  console.log(name);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home Logged={logged} name={name}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/Client/:clientusername' element={<ClientHome />}/>
        <Route path='/Artist/:artistusername' element={<ArtistHome />} />
        <Route path='/gallery' element={<Gallery/>} />
      </Route>
    )
  );
  function Layout(){
    return(
        <>
        <Header Role={role} Logged={logged}></Header>
        <Outlet></Outlet>
        <Footer></Footer>
        </>
    )
  }
  
    return (
      <>
          <RouterProvider router={router}/>
      </>
    )
}

export default App;