const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Accès refusé');
  
    try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      req.user = decoded; 
      next();
    }
    catch (ex) {
      res.status(401).json({ message: 'token invalide' });
    }
}