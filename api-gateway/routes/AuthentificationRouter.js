const AuthRoutes = [
    {
        url: '/auth',
        auth: false,
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