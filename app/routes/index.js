module.exports = function (express) {
    // Motor de rutas API
    var api = express.Router();
    // SPA
    api.get('/*', function (req, res) {
        res.render('index');
    });
    // Retornar rutas API
    return api;
};