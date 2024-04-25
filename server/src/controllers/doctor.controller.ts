import {Doctor} from "../models";
import {Request, Response, NextFunction} from "express";
import AsyncErrorCatching from "../utils/asyncErrorCatching";
import ErrorHandler from "../utils/ErrorHandler";
import {filterObj} from "../utils/helpers";


export const getDoctors = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const doctors = await Doctor.find();

    res.status(200).json({
        status: "success",
        results: doctors.length,
        data: {
            doctors,
        },
    });
});

export const getDoctor = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
        return next(new ErrorHandler("No doctor found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            doctor,
        },
    });
});

export const createDoctor = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    // check if doctor already exists
    const doctor = await Doctor.findOne({email: req.body.email});

    if (doctor) {
        return next(new ErrorHandler("Doctor already exists", 400));
    }

    const newDoctor = await Doctor.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            doctor: newDoctor,
        },
    });

})

export const updateDoctor = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {

    const filteredBody = filterObj(req.body, "phone", "email", "address");

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!doctor) {
        return next(new ErrorHandler("No doctor found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            doctor,
        },
    });

})

export const deleteDoctor = AsyncErrorCatching(async (req: Request, res: Response, next: NextFunction) => {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
        return next(new ErrorHandler("No doctor found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});
