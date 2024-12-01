const authService = require('../services/authService');

const register = async (req, res) => {
  console.log('lll')
  try {
    const { email, password } = req.body;
    const result = await authService.register(email, password);
    res.status(201).json({ message: "User registered successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    register,
    login
  }
