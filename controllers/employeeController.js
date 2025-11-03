const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Employee } = require("../models");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const emp = await Employee.create({ name, email, password: hashed });
  res.json({ message: "Employee registered", emp });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const emp = await Employee.findOne({ where: { email } });

  if (!emp || !(await bcrypt.compare(password, emp.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: emp.id }, process.env.JWT_SECRET);
  res.json({ message: "Login success", token });
};
