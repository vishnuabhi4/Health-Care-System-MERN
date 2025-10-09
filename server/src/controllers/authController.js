import { registerUser, loginUser, refreshAccessToken, logoutUser } from "../services/authService.js";

export const register = async (req, res) => {

  try {
 
    const user = await registerUser(req.body);

    // hide password from response
    const { password, ...safeUser } = user._doc;
    //._doc property of a Mongoose Document instance provides direct
    //access to the underlying plain JavaScript object (POJO)
    //that contains the actual data stored in the database.
    console.log(user._doc);
    //The ...safeUser part collects all the remaining properties except
    // password into a new object. and create an object called safeUser.
    res.status(201).json({ message: "User registered", user: safeUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginUser({ email, password });

    // Send refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ 
      userId: user._id, 
      role: user.role, 
      accessToken 
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

    const { accessToken } = await refreshAccessToken(refreshToken);
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);

    await logoutUser(refreshToken);

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
