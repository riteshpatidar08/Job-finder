import '@mantine/core/styles.css';
import './App.css';
import Navbar from './components/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import MyApplication from './pages/JobSeeker/MyApplication';
import PrivateRoutes from './components/PrivateRoutes';
// const Signup = lazy(()=>import('./components/auth/Signup')) ;

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

       <Route element={<PrivateRoutes allowedRole={['jobseeker']}/>}>

           <Route path='/jobseeker/myapplications' element={<MyApplication/>}/>
       
       </Route>
      </Routes>
    </>
  );
}

export default App;
