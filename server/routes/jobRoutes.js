import express from 'express' ;
import {getJobs,createJob, applyJob ,getJobByCreator} from './../controllers/jobControllers.js' ;

const JobRoutes = express.Router() ;


JobRoutes.post('/createjob' , createJob) ;
JobRoutes.get('/getjobs' , getJobs)
JobRoutes.post('/applyjob' , applyJob)
JobRoutes.get('/:id/creator' , getJobByCreator)

export default JobRoutes