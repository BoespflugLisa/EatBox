const RestaurantRouter = require("./routes/RestaurantRouter");
const NotificationRouter = require("./routes/NotificationRouter");
const OrderRouter = require("./routes/OrderRouter")
const AuthentificationRouter = require("./routes/AuthentificationRouter")
const UserRouter = require("./routes/UserRouter")

let ROUTES = [...RestaurantRouter.RestaurantRoutes, ...NotificationRouter.NotificationRoutes, ...OrderRouter.OrderRoutes, ...AuthentificationRouter.AuthRoutes, ...UserRouter.UserRoutes];

exports.ROUTES = ROUTES;