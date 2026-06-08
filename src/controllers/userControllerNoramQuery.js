// controllers/userController.js
const sequelize = require('../../config/db_connection');
const authenticateApiKey = require('../utils/authenticate'); // Authentication middleware
exports.updateUser=[
  authenticateApiKey, // Authentication middleware
  async  (req, res)=> {
    const { userId, name, email } = req.body;
    
    try {
      // Execute raw SQL query to update a user
      const [results, metadata] = await sequelize.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?', 
        {
          replacements: [name, email, userId],  // Use replacements to prevent SQL injection
        }
      );
  
      // Send a success response
      if (results.affectedRows > 0) {
        res.json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
];

exports.createUser=[
  authenticateApiKey, // Authentication middleware
  async (req, res) =>{
    const { name, email } = req.body;
    
    try {
      // Execute raw SQL query to insert a new user
      const [results, metadata] = await sequelize.query(
        'INSERT INTO users (name, email) VALUES (?, ?)', 
        {
          replacements: [name, email],  // Use replacements to prevent SQL injection
        }
      );
  
      // Send a success response
      res.status(201).json({ message: 'User created successfully', userId: results.insertId });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
];

exports.getAllUsers = [
  authenticateApiKey, // Authentication middleware
  async (req, res)=> {
    try {
      // Execute raw SQL query
      const [results, metadata] = await sequelize.query('SELECT * FROM dhc_category');
      
      // Send the results as a JSON response
      res.json({ users: results });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }
];

exports.deleteUser = [
  authenticateApiKey, // Authentication middleware
  async (req, res) =>{
    const { userId } = req.params;
  
    try {
      // Execute raw SQL query to delete a user
      const [results, metadata] = await sequelize.query(
        'DELETE FROM users WHERE id = ?', 
        {
          replacements: [userId],
        }
      );
  
      if (results.affectedRows > 0) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
];

