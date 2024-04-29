import { IPatient } from './user';

export interface IAppointment {
    _id: string;
    patient: IPatient;
    doctor: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        gender: string;
        createdAt: Date;
        updatedAt: Date;
        __v: 0;
    };
    date: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IAppointmentForm {
    patient: string;
    doctor: string;
    date: Date;
    notes: string;
}
