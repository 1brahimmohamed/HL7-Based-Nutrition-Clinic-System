export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface IPatient extends IUser {
    medicalHistory: {
        allergies: Array<string>;
        surgeries: Array<string>;
        medications: Array<string>;
        medicalConditions: Array<string>;
        medicalTests: Array<string>;
        inBodyScores: Array<string>;
        dietPlans: Array<string>;
        prescriptions: Array<string>;
    };
    fullName: string;
    birthdate: Date;
    associatedDoctor: string[];
    job: string;
    phoneNumber: string;
    age: number;
    id: string;
}
