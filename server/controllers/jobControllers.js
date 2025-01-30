import Job from './../models/jobModel.js';
import { sendSuccess } from '../utils/sendSuccess.js';
import User from './../models/userModel.js';

const getJobs = async (req, res) => {
  const { currentPage, totalItems = 10, search } = req.query;
  console.log(currentPage);
  console.log(search);
  try {
    const job = await Job.find()
      .sort({ postedDate: -1 })
      .limit(totalItems)
      .skip((currentPage - 1) * totalItems)
      .select('-applicants');

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

const getJobByCreator = async (req, res) => {
  try {
    const { id } = req.params;
    const jobs = await Job.find({ createdBy: id }).populate(
      'createdBy',
      'name email'
    );
    console.log(jobs);
    res.status(200).json({
      data: jobs,
    });
  } catch (error) {}
};

const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate(
      'applicants.userId',
      'name email'
    );
    res.status(200).json({
      data: job,
    });
  } catch (error) {}
};

const deactivateJob = async (req, res) => {
  const { jobId } = req.params;
  console.log(jobId);
  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(400).json({
      message: 'No job Found',
    });
  }
  if (!job.isActive) {
    res.status(400).json({
      message: 'Job is already deactivated',
    });
  }

  job.isActive = false;
  await job.save();

  res.status(200).json({
    message: 'Job is deactivated',
  });
};

const getAppliedJob = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate({
        path: 'appliedJobs.jobId',
        select: 'title companyName location experience applicants',
        populate: {
          path: 'applicants.userId',
          select: '_id',
        },
      })
      .select('-jobseeker -password -role -phoneNumber');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const appliedJobsWithStatus = user.appliedJobs.flatMap((appliedJob) => {
      return appliedJob.jobId.map((job) => {
        const applicant = job.applicants.find(
          (a) => a.userId?._id.toString() === userId
        );

        return {
          jobId: job._id,
          title: job.title,
          companyName: job.companyName,
          location: job.location,
          experience: job.experience,
          status: applicant ? applicant.status : 'Pending',
        };
      });
    });

    res.status(200).json({
      data: appliedJobsWithStatus,
    });
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const statusUpdate = async (req, res) => {
  const { jobId, applicantId } = req.params;
  const { status } = req.body;
  console.log(status);
  const job = await Job.findById(jobId);
  console.log(job);

  const applicant = job.applicants.find(
    (app) => app._id.toString() === applicantId
  );
  console.log(applicant);
  applicant.status = status;
  await job.save();
  res.status(200).json({
    message: 'Status updated Successfull',
  });
};

export {
  createJob,
  getJobs,
  applyJob,
  getJobByCreator,
  getApplicants,
  deactivateJob,
  getAppliedJob,
  statusUpdate,
};
