const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        Mail: String,
        Type: {
            Manager : {
                //rid : {type:String, ref:"Manager", default : () => `R${countID++}`},
                rid : String,
                sponsors : [String],
                sponsored : [String],
            },
            Deliveryman : {
                //lid : {type:String, ref:"Delivery", default : () => `L${countID++}`},
                lid : String,
                sponsors : [String],
                sponsored : [String],
                Phone: String,
            },
            Client : {
                //uid : {type:String, ref:"Client", default : () => `U${countID++}`},
                uid : String,
                sponsors : [String],
                sponsored : [String],
                Phone: String,
            },
            Developer : {
                //did : {type:String, ref:"Developer", default : () => `U${countID++}`},
                did : String,
                sponsors : [String],
                sponsored : [String],
                Phone: String,
            },
        },
    }
);

let User = mongoose.model("UserModel", UserSchema, "users");

module.exports = User;
