import React, { useState, useEffect } from 'react';
import Home from "./pages/home";
import Login from "./pages/Loginpage";
import Artists from "./pages/Artists";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientHome from './pages/Clienthome';
import ArtistHome from './pages/ArtistHome';
import Gallery from './pages/Gallery';
import AdminDashboard from './components/admin/Dashboard'
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';
import LoginForm from './components/LoginFrom';
import Portfolio from './pages/Portfolio';
import Followings from './pages/following';
import Settings from './pages/Settings';
import FeedBack from './pages/FeedBack';
import Reciepts from './pages/receipts';
import Wishlist from './pages/wishlist';
import Auction from './pages/Auction';
import Followers from './pages/followers';
import SoldReciepts from './pages/SoldArts';
import ArtistProtectedRoute from './components/ArtistProtectedRoute';
import ClientProtectedRoute from './components/ClientProtectedRoute';
import LoginProt from './components/LoginProtection';
import Exhibitions from './pages/Exhibitions';
//import { get } from '../../../Backend/Art_ExhibitionBackend/Art_ExhibitionBackend/routes/artist';

//import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
  //disableReactDevTools();
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
        <Route path='/gallery' element={<ClientProtectedRoute Role={role}><Gallery Logged={logged}/></ClientProtectedRoute>} />
        <Route path='/portfolio' element={<ArtistProtectedRoute Role={role}><Portfolio viewonly={false}/></ArtistProtectedRoute>  } />
        <Route path='/admin' element={<AdminDashboard  Logged={logged} Role={role} />} />
        <Route path='/artists' element={<ClientProtectedRoute Role={role}><Artists /></ClientProtectedRoute>} />
        <Route path='/following' element={<ClientProtectedRoute Role={role}><Followings /></ClientProtectedRoute>} />
        <Route path='/Settings' element={<LoginProt Logged={logged}><Settings/></LoginProt>} />
        <Route path='/Feedback' element={<FeedBack/>} />
        <Route path ='/portfolio/preview/:artistname' element={<Portfolio viewonly={true} />} />
        <Route path='/Purchase-history' element={<ClientProtectedRoute  Role={role}><Reciepts/></ClientProtectedRoute>}/>
        <Route path='/wishlist' element={<ClientProtectedRoute  Role={role}><Wishlist/></ClientProtectedRoute>}/>
        <Route path='/auctions' element={<ClientProtectedRoute  Role={role}><Auction /></ClientProtectedRoute>} />
        <Route path='/followers' element={<ArtistProtectedRoute Role={role}><Followers/></ArtistProtectedRoute>} />
        <Route path='/reciepts' element={<ArtistProtectedRoute Role={role}><SoldReciepts/></ArtistProtectedRoute>} />
        <Route path='/exhibitions' element={<Exhibitions/>} />
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