export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    major: string;
    phone: string;
    address: string;
    gender: string;
}

export interface IPatient extends IUser {
    birthdate: Date;
    associatedDoctor: string[];
    medicalHistory: {
        allergies: string[];
        surgeries: string[];
        medications: string[];
        medicalConditions: string[];
        inBodyScores: {
            date: Date;
            score: number;
            weight: number;
            height: number;
            targetWeight: number;
            weightControl: number;
            fatPercentage: number;
            musclePercentage: number;
        }[];
        dietPlans: {
            date: Date,
            breakfast: String,
            lunch: String,
            dinner: String,
            snacks: String,
            notes: String,
        }[];
        prescriptions: {
            startDate: Date,
            endDate: Date,
            medication: String,
            dosage: String,
            notes: String,
        }[];
        medicalTests: {
            date: Date,
            type: String,
            results: String,
            notes: String,
        }[];
    };
}

export interface IDoctor extends IUser {
    password: string | undefined;
}
