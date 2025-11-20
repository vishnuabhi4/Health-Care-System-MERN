import { registerUser, loginUser, refreshAccessToken, logoutUser, updateUser } from "../services/authService.js";

export const register = async (req, res) => {

  try {
 
    const user = await registerUser(req.body);

    // hide password from response
    const { password, ...safeUser } = user._doc;
    //._doc property of a Mongoose Document instance provides direct
    //access to the underlying plain JavaScript object (POJO)
    //that contains the actual data stored in the database.
    //The ...safeUser part collects all the remaining properties except
    // password into a new object. and create an object called safeUser.
    res.status(201).json({ message: "User registered", user: safeUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 

export const registerUserController = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const userId = req.user._id; // from authenticate middleware
    const updatedUser = await updateUser(userId, req.body);

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await loginUser({ email, password });

    // Send refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,            // must be false for localhost
      sameSite: "lax",          //recommended for SPA refresh flow
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ 
      userId: user._id, 
      role: user.role,
      username:user.username, 
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
