const axios = require('axios')

const setupAuth = (app, routes) => {
    const validAuth = async (req) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            let check = true
            if (token) {
                check = await axios.get('http://localhost:3000/auth/verify/' + token)
                    .then(response => {
                        return true;
                    })
                    .catch(err => {
                        if (err.response.status === 403) {
                            return false;
                        }
                    });
            } else {
                check = false;
            }
            return check;
        } catch (e) {
            return false
        }
    }

    routes.forEach(r => {
        if (r.auth) {
            app.use(r.url, async function (req, res, next) {
                const check = await validAuth(req, res);
                if (!check) {
                    res.status(403).json({
                        message: "Unauthorized access"
                    })
                } else {
                    next()
                }
            })
        }
    })
}

exports.setupAuth = setupAuth