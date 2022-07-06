const RestaurantRouter = require("./routes/RestaurantRouter");
const NotificationRouter = require("./routes/NotificationRouter");
const OrderRouter = require("./routes/OrderRouter")

let ROUTES = [...RestaurantRouter.RestaurantRoutes, ...NotificationRouter.NotificationRoutes, ...OrderRouter.OrderRoutes];

exports.ROUTES = ROUTES;