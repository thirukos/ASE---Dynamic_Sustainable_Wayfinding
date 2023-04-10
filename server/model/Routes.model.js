import mongoose from "mongoose";
export const RouteSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required: [true, "Please provide unique Username"]

        },
        origin:{
            type:String,
            required:[true, "Please provide origin"]
            

        },
        desination:{
            type:String,
            required:[true, "Please provide destination"]
        },

        distance:{
            type: Number,
            required:[true, "Please provide distance"]

        },
        transportmode:{
            type:String,
            required:[true, "Please provide transportmode"]

        },
        whetherscore:{
            type:String,
            required:[true, "Please provide whetherscore"]

        }

    }
);
export default mongoose.model.Route || mongoose.model('Route', RouteSchema);