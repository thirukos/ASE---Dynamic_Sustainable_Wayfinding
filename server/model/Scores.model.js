import mongoose from "mongoose";

export const ScoreSchema = new mongoose.Schema({
    userScore: { type: Number}
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);