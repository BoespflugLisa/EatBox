const NotificationRoutes = [
    {
        url: '/notifications',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3033/notifications/",
            changeOrigin: true,
            pathRewrite: {
                [`^/notifications`]: '',
            },
        }
    }
];

exports.NotificationRoutes = NotificationRoutes;