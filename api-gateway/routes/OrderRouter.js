const OrderRoutes = [
    {
        url: '/orders',
        auth: true,
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