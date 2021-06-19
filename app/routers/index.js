const admin = require('./admin');
const auth = require('./auth');
const crops = require('./crops');
const plants = require('./plants');
const schemas = require('./schemas');
const users = require('./users');
const get404 = require('../utils/404');

module.exports = function(app) {
    //app.use('/admin/user/:id', admin);
    app.use('/api/auth', auth);
    app.use('/api/crops', crops);
    app.use('/api/plants', plants);
    app.use('/api/schemas', schemas);
    app.use('/api/users', users);
    app.use((req, res) => get404(res));
};