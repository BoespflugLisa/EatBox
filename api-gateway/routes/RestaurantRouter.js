const RestaurantRoutes = [
    {
        url: '/restaurants',
        auth: true,
        proxy: {
            target: "http://localhost:3035/restaurants/",
            changeOrigin: true,
            pathRewrite: {
                [`^/restaurants`]: '',
            },
        }
    },
    {
        url: '/menus',
        auth: true,
        proxy: {
            target: "http://localhost:3035/menus/",
            changeOrigin: true,
            pathRewrite: {
                [`^/menus`]: '',
            },
        }
    },
    {
        url: '/articles',
        auth: true,
        proxy: {
            target: "http://localhost:3035/articles/",
            changeOrigin: true,
            pathRewrite: {
                [`^/articles`]: '',
            },
        }
    }
    ,
    {
        url: '/categories',
        auth: true,
        proxy: {
            target: "http://localhost:3035/categories/",
            changeOrigin: true,
            pathRewrite: {
                [`^/categories`]: '',
            },
        }
    }
];

exports.RestaurantRoutes = RestaurantRoutes;
