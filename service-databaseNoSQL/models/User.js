const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let countID = 0;

let UserSchema = new Schema(
    {
        UserID: {type: Number, ref:'User', default : () => countID++},
        Mail: String,
        Phone: String,
        Type: {
            Manager : {
                rid : {type:String, ref:"Manager", default : () => `R${countID}`},
                sponsors : [String],
                sponsored : [String],
            },
            Deliveryman : {
                lid : {type:String, ref:"Delivery", default : () => `L${countID}`},
                sponsors : [String],
                sponsored : [String],
            },
            Client : {
                uid : {type:String, ref:"Client", default : () => `U${countID}`},
                sponsors : [String],
                sponsored : [String],
            },
        },
    }
);

let User = mongoose.model("UserModel", UserSchema, "users");

User.countDocuments({}, function(err, count){
    countID = count;
})


module.exports = User;
