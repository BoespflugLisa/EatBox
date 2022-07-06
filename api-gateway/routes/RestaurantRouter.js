const RestaurantRoutes = [
    {
        url: '/restaurants',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
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
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
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
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
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
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
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
