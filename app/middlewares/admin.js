const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Accès refusé');
  
    try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);

      if(!decoded.isAdmin) return res.status(401).send('Accès refusé');
      
      req.user = decoded; 
      next();
    }
    catch (ex) {
      console.log(ex);
      res.status(401).json({ message: 'token invalide' });
    }
}