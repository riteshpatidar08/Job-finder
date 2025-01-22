import Job from './../models/jobModel.js';
import { sendSuccess } from '../utils/sendSuccess.js';
import User from './../models/userModel.js';

const getJobs = async (req, res) => {
  const { currentPage, totalItems = 10 } = req.query;
  console.log(currentPage);

  try {
    const job = await Job.find()
      .sort({ postedDate: -1 })
      .limit(totalItems)
      .skip((currentPage - 1) * totalItems).select('-applicants')

    if (!job) {
      return res.status(404).json({
        message: 'No Jobs Found',
      });
    }

    const totalCount = await Job.countDocuments();
    const totalPages = Math.ceil(totalCount / totalItems);
    const totalLength = job.length;
    sendSuccess(
      200,
      'Jobs fetched Successfully',
      { job, totalCount, totalLength, totalPages },
      res
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    if (!job) {
      return res.status(400).json({
        message: 'Job creation failed',
      });
    }
    sendSuccess(201, 'New job is successfully created', job, res);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const applyJob = async (req, res) => {
  const { userId, jobId } = req.body;

  //check if user exist
  const user = await User.findById(userId);
  console.log(user);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  const resumepath = user.jobseeker.resume;

  if (!resumepath) {
    return res.status(400).json({
      message:
        'Resume not found for this user , Please upload your resume in the profile section then try again',
    });
  }

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(400).json({
      message: 'The job you  applying for is not found',
    });
  }

  const alreadyapplied = user.appliedJobs.jobId.some(
    (id) => id.toString() === jobId
  );

  if (alreadyapplied) {
    return res.status(400).json({
      message: 'You have already applied for this job',
    });
  }

  user.appliedJobs.jobId.push(jobId);

  job.applicants.push({
    userId: userId,
    resume: resumepath,
    status: 'Pending',
  });

  await user.save();
  await job.save();

  res.status(200).json({
    message: 'Job applied successfull',
  });
};


const getJobByCreator = async(req,res) => {
  try {
     const {id } = req.params ;
  const jobs = await Job.find({createdBy : id}).populate('createdBy' , 'name email') ;
  console.log(jobs)
  res.status(200).json({
    data : jobs
  })
  } catch (error) {
    
  }
 
}

export { createJob, getJobs, applyJob ,getJobByCreator};
