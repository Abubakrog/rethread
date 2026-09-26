import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'rethread_super_secret_jwt_key_2026_eco_fashion', {
    expiresIn: '30d',
  });
};

export default generateToken;
