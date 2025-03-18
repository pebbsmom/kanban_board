import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error('ACCESS_TOKEN_SECRET is not defined in the environment variables');
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    console.log('username:', username);
    console.log('password:', password);
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (error) 
  { console.error('There was a problem with the login request:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);
 
export default router;
