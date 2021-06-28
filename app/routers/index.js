const admin = require('./admin');
const auth = require('./auth');
const contact = require('./contact');
const plants = require('./plants');
const schemas = require('./schemas');
const users = require('./users');
const get404 = require('../utils/404');

const adminMiddleware = require('../middlewares/admin');
const authMiddleware = require('../middlewares/auth');

module.exports = function(app) {
    app.use('/api/admin', adminMiddleware, admin);
    app.use('/api/auth', auth);
    app.use('/api/contact', contact);
    app.use('/api/plants', plants);
    app.use('/api/schemas', authMiddleware, schemas);
    app.use('/api/users', users);
    app.use((req, res) => get404(res));
};