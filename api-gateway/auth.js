const jwt = require('jsonwebtoken')

const setupAuth = (app, routes) => {

    const validAuth = (req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {

            

        } else {
            res.status(403).json({
                message: "Bad auth"
            });
        }
    }

    routes.forEach(r => {
        if (r.auth) {
            app.use(r.url, function (req, res, next) {
                validAuth(req, res);
                next();
            })
        }
    })
}

exports.setupAuth = setupAuth