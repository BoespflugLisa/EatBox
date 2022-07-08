const RestaurantRouter = require("./routes/RestaurantRouter");
const NotificationRouter = require("./routes/NotificationRouter");
const OrderRouter = require("./routes/OrderRouter")
const AuthentificationRouter = require("./routes/AuthentificationRouter")

let ROUTES = [...RestaurantRouter.RestaurantRoutes, ...NotificationRouter.NotificationRoutes, ...OrderRouter.OrderRoutes, ...AuthentificationRouter.AuthRoutes];

exports.ROUTES = ROUTES;