const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const userData = req.body;
    const result = await authService.register(userData);
    res.status(201).json({ message: "User registered successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json({result});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const result = await authService.resetPassword(token, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
  }