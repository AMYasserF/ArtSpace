import Home from "./pages/home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider} from 'react-router-dom';
function App() {
 
  const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={
        <Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='*' element={<Home/>}/>
        </Route>
    )
)
function Layout(){
  return(
      <>
      <Header></Header>
      <Outlet/>
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

export default App
