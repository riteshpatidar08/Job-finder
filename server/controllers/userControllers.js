import User from '../models/userModel.js';
import { generateToken } from '../utils/jwt.js';
import { comparePassword, hashedPassword } from '../utils/password.js';
import { sendSuccess } from '../utils/sendSuccess.js';

const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role, jobseeker, recruiter } =
      req.body;
    console.log(name);
    console.log(req.file);

    const user = await User.findOne({ email });
    // if(user){

    // }
    const hashPass = await hashedPassword(password);

    const userData = {
      name,
      email,
      phoneNumber,
      password: hashPass,
      role,
    };

    //TODO if user already exists , Please login

    if (role === 'jobseeker') {
      const parsedJobSeeker = JSON.parse(jobseeker);
      console.log('....parsedData', parsedJobSeeker);
      userData.jobseeker = {
        ...parsedJobSeeker,
        resume: req.file ? req.file.path : null,
      };
    }

    console.log('...userData', userData);

    if (role === 'recruiter') {
      userData.recruiter = JSON.parse(recruiter);
    }
    // if (!user) {
    // }
    const newUser = await User.create(userData);

    // res.status(201).json({
    //   message: 'user registered successfull',
    //   newUser
    // });

    sendSuccess(201, `${newUser.role} registered successfully`, newUser, res);
  } catch (error) {
    //handle the error case
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check user exist
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      res.status(400).json({
        message: 'User is not registered , Please Signup and try again',
      });
    }

   
    //password compare
    const comparePass = await comparePassword(password, existingUser.password);
console.log(comparePass)
    if (!comparePass) {
      res.status(400).json({
        message: 'Password donot match , Please try again',
      });
    }
    const payload = {
      id: existingUser._id,
      role: existingUser.role,
      name: existingUser.name,
    };
    const token = generateToken(payload);

    sendSuccess(200,'User login successfully',{token},res)
  } catch (error) {}
};

export { register , login};
