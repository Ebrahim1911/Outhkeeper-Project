const allowTo = (...roles) => {
  return (req, res, next) => {
    console.log("from allowTo", roles);
    if (!roles.includes(req.currentUser.role)) {
      console.log("from Allow To", req.currentUser.role);
    }
    next();
  };
};
export default allowTo;
