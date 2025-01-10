import User from '../models/userModel.js';

const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role, jobseeker, recruiter } =
      req.body;
    console.log(req.file);

    const user = await User.findOne({email})
    if(user){
      
    }


    const userData = {
      name,
      email,
      phoneNumber,
      password,
      role,
    };

    if (role === 'jobseeker') {
      userData.jobseeker = JSON.parse(jobseeker);
    }

    if (role === 'recruiter') {
      userData.recruiter = JSON.parse(recruiter);
    }
    // if (!user) {
    // }
    const newUser = await User.create(userData)

    res.status(201).json({
      message: 'user registered successfull',
    });
  } catch (error) {}
};

export { register };
