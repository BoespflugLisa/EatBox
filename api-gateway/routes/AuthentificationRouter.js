const AuthRoutes = [
    {
        url: '/register',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/register",
            changeOrigin: true,
            pathRewrite: {
                [`^/register`]: '',
            },
        }
    },
    {
        url: '/login',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/login/",
            changeOrigin: true,
            pathRewrite: {
                [`^/login`]: '',
            },
        }
    }
];

exports.AuthRoutes= AuthRoutes;