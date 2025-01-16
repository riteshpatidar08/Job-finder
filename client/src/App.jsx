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
// const Signup = lazy(()=>import('./components/auth/Signup')) ;

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
