const OrderRoutes = [
    {
        url: '/orders',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3034/orders/",
            changeOrigin: true,
            pathRewrite: {
                [`^/orders`]: '',
            },
        }
    }
];

exports.OrderRoutes = OrderRoutes;