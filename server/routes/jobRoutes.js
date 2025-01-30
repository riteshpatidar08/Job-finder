import express from 'express' ;
import {getJobs,createJob, applyJob ,getJobByCreator, getApplicants, deactivateJob, statusUpdate, getAppliedJob} from './../controllers/jobControllers.js' ;

const JobRoutes = express.Router() ;


JobRoutes.post('/createjob' , createJob) ;
JobRoutes.get('/getjobs' , getJobs)
JobRoutes.post('/applyjob' , applyJob)
JobRoutes.get('/:id/creator' , getJobByCreator)
JobRoutes.get('/:jobId/applicants',getApplicants)
JobRoutes.get('/:jobId/deactivate',deactivateJob)
JobRoutes.post('/:jobId/:applicantId/status' , statusUpdate)
JobRoutes.get('/:userId/appliedJobs' , getAppliedJob)

export default JobRoutes