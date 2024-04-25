import { Request } from 'express';
import Doctor from "../models/doctor.model";

// Define a custom interface that extends Express.Request
interface CustomRequest extends Request {
    doctor?: Doctor; // Add a property for doctor information
}

export default CustomRequest;
