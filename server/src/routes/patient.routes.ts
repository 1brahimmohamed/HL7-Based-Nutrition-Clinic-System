import express from "express";
import {
    getPatients,
    getPatient,
    createPatient,
    updatePatientInfo,
    updatePatientMedicalHistory,
    deletePatient,
    referPatientToAnotherClinic
} from "../controllers/patient.controller";

const router = express.Router();

router.route("/")
    .get(getPatients)
    .post(createPatient);


router.route("/:id")
    .get(getPatient)
    .patch(updatePatientInfo)
    .delete(deletePatient);


router.patch("/:id/medical-history", updatePatientMedicalHistory);
router.post("/:id/refer", referPatientToAnotherClinic);


export default router;
