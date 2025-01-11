import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  //common field for all roles
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'recruiter', 'jobseeker'],
  },
  jobseeker: {
    education: [
      {
        degree: {
          type: String,
        },
        institution: {
          type: String,
        },
        year: {
          type: Number,
        },
      },
    ],
    experiance: [
      {
        companyName: {
          type: String,
        },
        designation: {
          type: String,
        },
        duration: {
          type: String,
        },
      },
    ],
    skills: {
      type: [String],
    },
    resume: {
      type: String,
    },
  },
  recruiter: {
    companyName: {
      type: String,
    },
    companyWebsite: {
      type: String,
    },
  },
});

//middleware
UserSchema.pre('save', async function (next) {
  if (this.role === 'recruiter') {
    this.jobseeker = undefined;
    next();
  }
  if (this.role === 'jobseeker') {
    this.recruiter = undefined;
    next();
  }
});

const User = mongoose.model('User', UserSchema);

export default User;
