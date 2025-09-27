
export const authorizeRoles = (...allowedRoles) => {
    //...allowedRoles - (rest parameter)It allows the function to accept
    //  any number of arguments as an array
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }
    next();
  };
};
