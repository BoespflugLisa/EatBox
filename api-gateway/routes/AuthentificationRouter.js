const AuthRoutes = [
    {
        url: '/auth/register/developer',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/auth/register/developer/",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/register/developer`]: '',
            },
        }
    },
    {
        url: '/auth/register/delivery',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/auth/register/delivery/",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/register/delivery`]: '',
            },
        }
    },
    {
        url: '/auth/register/client',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/auth/register/client/",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/register/client`]: '',
            },
        }
    },
    {
        url: '/auth/register/restaurant',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/auth/register/restaurant/",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/register/restaurant`]: '',
            },
        }
    },
    {
        url: '/auth/login',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3036/auth/login/",
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/login`]: '',
            },
        }
    }
];

exports.AuthRoutes= AuthRoutes;