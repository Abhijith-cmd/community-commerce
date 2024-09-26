import bcrypt from 'bcrypt'
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
// export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { username, password, status } = req.body;
//   try {
//     const newUser = new UserCredentials({ username, password, status });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating user' });
//   }
// };


// Controller function to create a new user with password hashing
// export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { username, password, status } = req.body;

//   try {
//     // Hash the password before saving it to the database
//     const saltRounds = 10; // You can adjust the number of salt rounds (10 is a good default)
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = new UserCredentials({
//       username,
//       password: hashedPassword, // Store the hashed password
//       status
//     });

//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating user' });
//   }
// };


// Controller function to create a new user with password hashing for all the user details included
export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    firstName,
    lastName,
    username, // This will be the email ID
    password,
    status,
    address,
    locality,
    community,
    preferredLanguage,
    phoneNumber,
  } = req.body;

  try {
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new UserCredentials({
      firstName,
      lastName,
      username,
      password,
      status,
      address,
      locality,
      community,
      preferredLanguage,
      phoneNumber,
    });

    await newUser.save();
    res.status(201).json(newUser);
    console.log("New User:", newUser);
res.status(201).json(newUser);

  } catch (error) {  // Explicitly type error as 'any'
    // console.error("Error creating user:", error); 
    // res.status(500).json({ message: error.message, error: 'Error creating user' });
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      console.error("Error creating user:", error.message); 
      res.status(500).json({ message: error.message, error: 'Error creating user' });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).json({ message: 'Unexpected error', error: 'Error creating user' });
    }
  }
};



// Controller function to update a user by ID
// export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;
//   const updates = req.body;
//   try {
//     const updatedUser = await UserCredentials.findByIdAndUpdate(id, updates, { new: true });
//     if (!updatedUser) return res.status(404).json({ error: 'User not found' });
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Error updating user' });
//   }
// };

//updating function with hashing passwords
// export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { id } = req.query;
//   const updates = req.body;

//   try {
//     // Check if the password is being updated, and hash it if necessary
//     if (updates.password) {
//       const saltRounds = 10;
//       updates.password = await bcrypt.hash(updates.password, saltRounds);
//     }

//     // Update the user in the database with the modified updates
//     const updatedUser = await UserCredentials.findByIdAndUpdate(id, updates, { new: true });

//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Error updating user' });
//   }
// };

// Controller function to update a user by ID or all the user details included
export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const updates = req.body;

  try {
    // Check if the password is being updated, and hash it if necessary
    if (updates.password) {
      const saltRounds = 10;
      updates.password = await bcrypt.hash(updates.password, saltRounds);
    }

    // Update the user in the database with the modified updates
    const updatedUser = await UserCredentials.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

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
