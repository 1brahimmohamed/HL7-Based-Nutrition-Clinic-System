import {Doctor} from "../models";
import asyncErrorCatching from "../utils/asyncErrorCatching";
import jwt, {JwtPayload} from "jsonwebtoken";
import {Response, NextFunction} from "express";
import ErrorHandler from "../utils/ErrorHandler";
import CustomRequest from "../types/Request";

const signToken = (id: string) => {
    return jwt.sign({id}, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (doctor: any, statusCode: number, res: Response) => {

    const token = signToken(doctor._id);

    const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * parseInt(process.env.JWT_COOKIE_EXPIRES_IN!)),
        httpOnly: true,
    };

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    doctor.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            doctor
        }
    });
};


export const signup = asyncErrorCatching(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const newDoctor = await Doctor.create(req.body);

    createSendToken(newDoctor, 201, res);
});

export const login = asyncErrorCatching(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new ErrorHandler('Please provide email and password!', 400));
    }

    // 2) Check if user exists && password is correct
    const doctor = await Doctor.findOne({email}).select('+password');

    if (!doctor || !(await doctor.correctPassword(password, doctor.password))) {
        return next(new ErrorHandler('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(doctor, 200, res);
});

export const protect = asyncErrorCatching(async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;

    // Read the token and check if it exists
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token)
        return next(new ErrorHandler('You are not logged in! Please log in to get access.', 401));

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded)
        return next(new ErrorHandler('Invalid token. Please log in again.', 401));

    // Check if user still exists
    const newDoctor = await Doctor.findById((decoded as JwtPayload).id);

    if (!newDoctor)
        return next(
            new ErrorHandler(
                'The user belonging to this token does no longer exist.',
                401
            )
        );


    // Grant accesses to protected route
    req.doctor = newDoctor;

    next();
})

export const logout = asyncErrorCatching(async (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() - 10 * 1000),
        httpOnly: true
    });

    res.status(200).json(
        {
            status: 'success'
        }
    );
});

