import express from 'express' ;
import {getJobs,createJob, applyJob ,getJobByCreator, getApplicants, deactivateJob} from './../controllers/jobControllers.js' ;

const JobRoutes = express.Router() ;


JobRoutes.post('/createjob' , createJob) ;
JobRoutes.get('/getjobs' , getJobs)
JobRoutes.post('/applyjob' , applyJob)
JobRoutes.get('/:id/creator' , getJobByCreator)
JobRoutes.get('/:jobId/applicants',getApplicants)
JobRoutes.get('/:jobId/deactivate',deactivateJob)

export default JobRoutes