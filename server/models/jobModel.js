import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  companyName: {
    type: String,
  },
  location: {
    type: String,
  },
  jobDescription: {
    type: String,
  },
  experience : {
    type  : String 
  },
  requirement: {
    type: [String],
  },
  employment: {
    type: [String],
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  },
  salaryRange: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  postedDate: {
    type: Date,
    default: Date.now(),
  },
});


const Job = mongoose.model('Job',JobSchema) ;
export default Job ;