import { Role } from "./role.js";
import mongoose from "mongoose";
const gradeSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
        min: [0, "Grade cannot be less than 0"],
        max: [100, "Grade cannot be more than 100"],
    },
});
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: [30, "Name cannot be more than 30 characters"],
    },
    passportId: {
        type: String,
        maxlength: 9,
        minlength: 9,
        match: [/\d{9}/, "Passport ID is not valid"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    grades: { type: [gradeSchema], default: [] },
    role: {
        type: String,
        required: true,
        trim: true,
        enum: [...Object.values(Role)],
        default: Role.STUDENT,
    },
});
export default mongoose.model("User", userSchema);
export const GradeModel = mongoose.model("Grade", gradeSchema);
