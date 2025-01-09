import jwt from 'jsonwebtoken' ;


export const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET_STRING ;
    return jwt.verify(payload , secret , { expiriesIn : '1d'})
}