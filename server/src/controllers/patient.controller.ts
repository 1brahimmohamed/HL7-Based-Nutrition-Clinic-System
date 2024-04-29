import {Patient} from "../models";
import {Request, Response, NextFunction} from "express";
import AsyncErrorCatching from "../utils/asyncErrorCatching";
import ErrorHandler from "../utils/ErrorHandler";
import {filterObj} from "../utils/helpers";

export const getPatients = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const patients = await Patient.find();

    res.status(200).json({
        status: "success",
        results: patients.length,
        data: {
            patients,
        },
    });

});
export const getPatient = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
        return next(new ErrorHandler("No patient found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            patient,
        },
    });
});
export const createPatient = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    // check if patient already exists
    const patient = await Patient.findOne({email: req.body.email});

    if (patient) {
        return next(new ErrorHandler("Patient already exists", 400));
    }

    const newPatient = await Patient.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            patient: newPatient,
        },
    });
});
export const updatePatientInfo = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const filteredBody = filterObj(req.body, "firstName", "lastName", "email", "birthdate", "phone", "address", "associatedDoctor");

    const patient = await Patient.findByIdAndUpdate(req.params.id, filteredBody, {
        new: true,
        runValidators: true,
    });

    if (!patient) {
        return next(new ErrorHandler("No patient found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            patient,
        },
    });
});
export const updatePatientMedicalHistory = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const filteredBody = filterObj(req.body,
        "allergies",
        "surgeries",
        "medications",
        "medicalConditions",
        "inBodyScores",
        "dietPlans",
        "prescriptions",
        "medicalTests",
    );


    const patient = await Patient.findById(req.params.id);

    if (!patient) {
        return next(new ErrorHandler("No patient found with that ID", 404));
    }

    // find the fields that is present in the request body
    const keys = Object.keys(filteredBody);

    // update the patient's medical history with the fields present in the request body
    keys.forEach((key) => {
       if (patient.medicalHistory && (patient.medicalHistory as any)[key]) {
           console.log(key, (filteredBody as any)[key]);
              (patient.medicalHistory as any)[key] = (filteredBody as any)[key];
       }
    });

    await patient.save();

    res.status(200).json({
        status: "success",
        data: {
            patient,
        },
    });

});
export const deletePatient = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
        return next(new ErrorHandler("No patient found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });

});

