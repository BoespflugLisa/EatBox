const NotificationRoutes = [
    {
        url: '/notifications',
        auth: true,
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