import mongoose from "mongoose";
import validator from "validator";

const patientSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "the User must have first name"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "the User must have last name"],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            validate: [validator.isEmail, "please provide a valid email"],
            required: true,
            lowercase: true,
        },
        gender: {
            type: String,
            enum: ["female", "male", "other"],
            required: true,
        },
        job: {
            type: String,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        address: String,
        birthdate: {
            type: Date,
            required: true,
        },
        associatedDoctor: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Doctor",
            }
        ],
        medicalHistory: {
            allergies: [String],
            surgeries: [String],
            medications: [String],
            medicalConditions: [String],
            inBodyScores: [
                {
                    date: Date,
                    score: Number,
                    weight: Number,
                    height: Number,
                    targetWeight: Number,
                    weightControl: Number,
                    fatPercentage: Number,
                    musclePercentage: Number,
                },
            ],
            dietPlans: [
                {
                    date: Date,
                    breakfast: String,
                    lunch: String,
                    dinner: String,
                    snacks: String,
                    notes: String,
                },
            ],
            prescriptions: [
                {
                    startDate: Date,
                    endDate: Date,
                    medication: String,
                    dosage: String,
                    notes: String,
                }
            ],
            medicalTests: [
                {
                    date: Date,
                    type: String,
                    results: String,
                    notes: String,
                }
            ],
        },
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        timestamps: true,
    }
);

patientSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
})

patientSchema.virtual("age").get(function () {
    const today = new Date();
    const birthdate = new Date(this.birthdate);
    let age = today.getFullYear() - birthdate.getFullYear();
    const month = today.getMonth() - birthdate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
})

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
