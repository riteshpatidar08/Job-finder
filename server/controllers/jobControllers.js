import Job from './../models/jobModel.js';
import { sendSuccess } from '../utils/sendSuccess.js';

const getJobs = async (req, res) => {
  const { currentPage, totalItems = 10 } = req.query;
  console.log(currentPage);
  try {
    const job = await Job.find()
      .limit(totalItems)
      .skip((currentPage - 1) * totalItems);

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

export { createJob, getJobs };
