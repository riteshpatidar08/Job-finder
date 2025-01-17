import '@mantine/core/styles.css';
import './App.css';
import Navbar from './components/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import MyApplication from './pages/JobSeeker/MyApplication';
import PrivateRoutes from './components/PrivateRoutes';
import PostJobPage from './pages/Recruiter/PostJobPage';
import OpenRoutes from './components/OpenRoutes';
// const Signup = lazy(()=>import('./components/auth/Signup')) ;
import { Toaster } from 'sonner'
import Homepage from './pages/Homepage';

function App() {
  return (
    <>
    <Toaster  position="top-center"/>
      <Navbar />
      <Routes>
        <Route element={<OpenRoutes/>}>
          <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path='/' element={<Homepage/>}/>
        <Route element={<PrivateRoutes allowedRole={['jobseeker']} />}>
          <Route path="/jobseeker/myapplications" element={<MyApplication />} />
        </Route>

        <Route element={<PrivateRoutes allowedRole={['recruiter']}/>}>
          <Route path='/recruiter/post-job' element={<PostJobPage/>}/>
        </Route>


      </Routes>
    </>
  );
}

export default App;
