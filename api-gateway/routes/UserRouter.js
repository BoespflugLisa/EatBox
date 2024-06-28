const UserRoutes = [
    {
        url: '/users/restaurants',
        auth: true,
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
        auth: true,
        proxy: {
            target: "http://localhost:3038/users/clients/",
            changeOrigin: true,
            pathRewrite: {
                [`^/users/clients`]: '',
            },
        }
    },
    {
        url: '/users/developers',
        auth: true,
        proxy: {
            target: "http://localhost:3039/users/developers/",
            changeOrigin: true,
            pathRewrite: {
                [`^/users/developers`]: '',
            },
        }
    },
    {
        url: '/users/deliverymen',
        auth: true,
        proxy: {
            target: "http://localhost:3040/users/deliverymen/",
            changeOrigin: true,
            pathRewrite: {
                [`^/users/deliverymen`]: '',
            },
        }
    }

];

exports.UserRoutes= UserRoutes;
