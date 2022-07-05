const RestaurantRouter = require("./routes/RestaurantRouter")
const NotificationRouter = require("./routes/NotificationRouter")

let ROUTES = [...RestaurantRouter.RestaurantRoutes, ...NotificationRouter.NotificationRoutes];

exports.ROUTES = ROUTES;