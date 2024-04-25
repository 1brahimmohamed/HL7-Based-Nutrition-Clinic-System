import express from 'express';

import {
    getAppointments,
    getAppointment,
    getDoctorAppointments,
    getPatientAppointments,
    updateAppointment,
    createAppointment,
    deleteAppointment
} from '../controllers/appointment.controller';

const router = express.Router();

router.route('/')
    .get(getAppointments)
    .post(createAppointment);

router.route('/:id')
    .get(getAppointment)
    .patch(updateAppointment)
    .delete(deleteAppointment);


router.route('/doctor-appointments/:id')
    .get(getDoctorAppointments);

router.route('/patient-appointments/:id')
    .get(getPatientAppointments);

export default router;
