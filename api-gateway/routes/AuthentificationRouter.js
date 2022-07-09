const AuthRoutes = [
    {
        url: '/register/developer',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/register/developer/",
            changeOrigin: true,
            pathRewrite: {
                [`^/register/developer`]: '',
            },
        }
    },
    {
        url: '/register/delivery',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/register/delivery/",
            changeOrigin: true,
            pathRewrite: {
                [`^/register/delivery`]: '',
            },
        }
    },
    {
        url: '/register/client',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/register/client/",
            changeOrigin: true,
            pathRewrite: {
                [`^/register/client`]: '',
            },
        }
    },
    {
        url: '/register/restaurant',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/register/restaurant/",
            changeOrigin: true,
            pathRewrite: {
                [`^/register/restaurant`]: '',
            },
        }
    },
    {
        url: '/login',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/login/",
            changeOrigin: true,
            pathRewrite: {
                [`^/login`]: '',
            },
        }
    }
];

exports.AuthRoutes= AuthRoutes;