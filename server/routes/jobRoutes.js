import express from 'express' ;
import {getJobs,createJob} from './../controllers/jobControllers.js' ;

const JobRoutes = express.Router() ;


JobRoutes.post('/createjob' , createJob) ;
JobRoutes.get('/getjobs' , getJobs)


export default JobRoutes