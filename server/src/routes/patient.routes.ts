import express from "express";
import {
    getPatients,
    getPatient,
    createPatient,
    updatePatientInfo,
    updatePatientMedicalHistory,
    deletePatient,
} from "../controllers/patient.controller";

const router = express.Router();

router.route("/")
    .get(getPatients)
    .post(createPatient);


router.route("/:id")
    .get(getPatient)
    .patch(updatePatientInfo)
    .delete(deletePatient);

router.route("/:id/medical-history")
    .patch(updatePatientMedicalHistory);


export default router;
