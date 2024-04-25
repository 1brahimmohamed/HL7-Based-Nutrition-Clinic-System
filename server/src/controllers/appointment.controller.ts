import {Request, Response, NextFunction} from "express";
import AsyncErrorCatching from "../utils/asyncErrorCatching";
import ErrorHandler from "../utils/ErrorHandler";
import {Appointment} from "../models";


export const getAppointments = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const appointments = await Appointment.find().populate('patient doctor');

    res.status(200).json({
        status: "success",
        results: appointments.length,
        data: {
            appointments,
        },
    });
});

export const getAppointment = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const appointment = await Appointment.findById(req.params.id).populate('patient doctor');

    if (!appointment) {
        return next(new ErrorHandler("No appointment found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            appointment,
        },
    });
});

export const getDoctorAppointments = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const appointments = await Appointment.find({doctor: req.params.id}).populate('patient doctor');

    res.status(200).json({
        status: "success",
        results: appointments.length,
        data: {
            appointments,
        },
    });
});

export const getPatientAppointments = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const appointments = await Appointment.find({patient: req.params.id}).populate('patient doctor');

    res.status(200).json({
        status: "success",
        results: appointments.length,
        data: {
            appointments,
        },
    });
});

export const createAppointment = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    // check if the dr has other appointments at the same time
    const doctorAppointments = await Appointment.find({
        doctor: req.body.doctor,
        date: req.body.date,
    });

    if (doctorAppointments.length > 0) {
        return next(new ErrorHandler("Doctor already has an appointment at that time", 400));
    }

    // check if the patient has other appointments at the same time
    const patientAppointments = await Appointment.find({
        patient: req.body.patient,
        date: req.body.date,
    });

    if (patientAppointments.length > 0) {
        return next(new ErrorHandler("Patient already has an appointment at that time", 400));
    }

    const newAppointment = await Appointment.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            appointment: newAppointment,
        },
    });

})

export const updateAppointment = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!appointment) {
        return next(new ErrorHandler("No appointment found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            appointment,
        },
    });

})

export const deleteAppointment = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
        return next(new ErrorHandler("No appointment found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
})

