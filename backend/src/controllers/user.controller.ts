import { Request, Response } from "express";
import { 
  registerUser, 
  loginUser, 
  resetPassword 
} from "../services/user.service";
import { Role } from "../interfaces/role.enum";
import { sendRegistrationEmail } from '../config/mailer'


/**
 * Controller to register a new user
 * @param req 
 * @param res 
 * @returns 
 */
const register = async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;
  try {
    const userRole = role ? role : Role.USER;
    const user = await registerUser(email, password, name, userRole);
    // console.log('User registered:', user);
    await sendRegistrationEmail(email, name);
    res.status(201).json(user);
  } catch (error: any) {
    // console.error('Error during registration:', error);
    res.status(400).json({ error: error.message });
  }
};


/**
 * Controller to login a user
 * @param req 
 * @param res 
 * @returns 
 */
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    if (token) {
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


/**
 * resetUserPassword
 * @param req 
 * @param res 
 */
const resetUserPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  try {
    const success = await resetPassword(email, newPassword);
    res.json({ success });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login, resetUserPassword };