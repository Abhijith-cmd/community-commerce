import { NextApiRequest, NextApiResponse } from 'next';
import UserCredentials from '../../models/loginModel/userCredentials';

// Controller function to get all users
export const getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await UserCredentials.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Controller function to get a user by ID
export const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const user = await UserCredentials.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Controller function to create a new user
export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password, status } = req.body;
  try {
    const newUser = new UserCredentials({ username, password, status });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Controller function to update a user by ID
export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const updates = req.body;
  try {
    const updatedUser = await UserCredentials.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Controller function to delete a user by ID
export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    const deletedUser = await UserCredentials.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};
