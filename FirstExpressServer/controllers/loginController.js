import loginService from "../services/loginService.js";

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Email and password are required");
  }
  try {
    const user = loginService.login(req.body.email, req.body.password);
    res.status(200).send("User is connected");
  } catch (err) {
    res.status(401).send(err.message);
  }
};

export default login;
