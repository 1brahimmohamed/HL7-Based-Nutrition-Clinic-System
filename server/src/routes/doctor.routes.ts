import express from "express";
import {
    getDoctors,
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor,
} from "../controllers/doctor.controller";

const router = express.Router();

router.route("/")
    .get(getDoctors)
    .post(createDoctor);

router.route("/:id")
    .get(getDoctor)
    .patch(updateDoctor)
    .delete(deleteDoctor);

export default router;
