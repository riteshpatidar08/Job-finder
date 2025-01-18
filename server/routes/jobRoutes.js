import express from 'express' ;
import {getJobs,createJob, applyJob} from './../controllers/jobControllers.js' ;

const JobRoutes = express.Router() ;


JobRoutes.post('/createjob' , createJob) ;
JobRoutes.get('/getjobs' , getJobs)
JobRoutes.post('/applyjob' , applyJob)

export default JobRoutes