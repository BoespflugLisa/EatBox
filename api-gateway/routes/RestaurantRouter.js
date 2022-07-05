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
            target: "http://localhost:3031/restaurants/",
            changeOrigin: true,
            pathRewrite: {
                [`^/restaurants`]: '',
            },
        }
    }
];

exports.RestaurantRoutes = RestaurantRoutes;