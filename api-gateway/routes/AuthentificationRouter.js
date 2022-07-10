const AuthRoutes = [
    {
        url: '/auth',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/auth/",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth`]: '',
            },
        }
    },

];

exports.AuthRoutes= AuthRoutes;