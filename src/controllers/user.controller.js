import User from '../models/user.model.js';
//creat user
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body); 

    res.status(201).json(user); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//get all users 
 export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update user krenge
export const updateUser = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete user krenge
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};