const UserRoutes = [
    {
        url: '/users/restaurants',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3037/users/restaurants/",
            changeOrigin: true,
            pathRewrite: {
                [`^/users/restaurants`]: '',
            },
        }
    },
    {
        url: '/users/clients',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3038/users/clients/",
            changeOrigin: true,
            pathRewrite: {
                [`^/users/clients`]: '',
            },
        }
    },

];

exports.UserRoutes= UserRoutes;