const admin = require('./admin');
const auth = require('./auth');
const crops = require('./crops');
const plants = require('./plants');
const schemas = require('./schemas');
const users = require('./users');

module.exports = function(app) {
    //app.use('/admin/user/:id', admin);
    app.use('/auth', auth);
    app.use('/crops', crops);
    app.use('/plants', plants);
    app.use('/schemas', schemas);
    app.use('/users', users);
};