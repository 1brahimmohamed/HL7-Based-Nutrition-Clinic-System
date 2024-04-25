import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

// Define the interface for the Doctor document
interface IDoctorDocument extends Document {
    firstName: string;
    lastName: string;
    email: string
    password: string
    gender: string
    major: string
    phone: string
    address: string
    correctPassword: (enteredPassword: string, userPassword: string) => Promise<boolean>;
}


const doctorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "the User must have first name"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "the User must have name"],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            validate: [validator.isEmail, "please provide a valid email"],
            required: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "the User must have password"],
            minlength: 8,
            select: false,
        },
        gender: {
            type: String,
            enum: ["female", "male", "other"],
            required: true,
        },
        major: {
            type: String,
            trim: true,
        },
        phone: String,
        address: String
    },
    {
        timestamps: true,
    }
);

doctorSchema.virtual("fullName").get(function (this: IDoctorDocument) {
    return `${this.firstName} ${this.lastName}`;
});

doctorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

doctorSchema.methods.correctPassword = async function (
    enteredPassword: string,
    userPassword: string
) {
    return await bcrypt.compare(enteredPassword, userPassword);
};

const Doctor = mongoose.model<IDoctorDocument>("Doctor", doctorSchema);
export default Doctor;

