module.exports = function(handler) {
    return async (req, res) => {
        try {
            handler(req, res);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message: 'Error 500'});
        }
    }
}