module.exports = (req, res, next) =>{
  if(req.user.role !== 1 ){
    const error = new Error('Not authorized.');
    error.statusCode = 401;
    throw error;
  }
  next();
}