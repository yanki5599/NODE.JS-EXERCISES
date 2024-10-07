import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: String,
    passportId: {
        type: String,
        minlength: 9,
        maxlength: 9,
    },
    password: String,
    grades: [String],
    role: String,
});
export default mongoose.model("User", userSchema);
