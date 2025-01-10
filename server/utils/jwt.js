import jwt from 'jsonwebtoken' ;


export const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET_STRING ;
    return jwt.sign(payload , secret , { expiresIn : '20d'})
}