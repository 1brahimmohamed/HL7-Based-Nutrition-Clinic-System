import mongoose from "mongoose";
import validator from "validator";

interface IAppointmentDocument extends mongoose.Document {
    patient: string;
    doctor: string;
    date: Date;
    time: string;
    status: string;
    notes: string;
}

const appointmentSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
        },
        notes: String,
    },
    {
        timestamps: true,
    }
);

const Appointment = mongoose.model<IAppointmentDocument>("Appointment", appointmentSchema);

export default Appointment;
