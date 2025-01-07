import User from '../models/userModel.js';

const register = async(req,res) => {
    try {
      const user = await  User.create(req.body) ;
      
      if(!user){


      }

      res.status(201).json({
        message : 'user registered successfull'
      })
    } catch (error) {
        
    }
};

export { register };
