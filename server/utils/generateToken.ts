// utils/generateToken.ts
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.JWT_SECRET;

console.log(!SECRET ? 'No secret found' : 'Secret with me')
console.log(SECRET)

export const verifyToken = (userId: string) => {
  try {
    return jwt.sign({ userId }, SECRET, { expiresIn: '1h' });
  } catch (error) {
    console.error('Token generation failed:', error);
    throw new Error('Token generation failed');
  }
};

