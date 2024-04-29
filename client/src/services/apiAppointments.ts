import axios from 'axios';
import { IAppointmentForm } from '../types/appointment';

const API_URL = `${import.meta.env.VITE_BASE_URL}/appointment`;

export const getAllAppointments = async () => {
    const res = await axios.get(`${API_URL}`);

    if (!res.data) {
        throw new Error('Failed to fetch all appointments');
    }

    const { appointments } = res.data.data;

    return appointments;
};

export const getAppointment = async (id: string) => {
    const res = await axios.get(`${API_URL}/${id}`);

    if (!res.data) {
        console.log('err');
        throw new Error('Failed to fetch appointment');
    }

    const { appointment } = res.data.data;

    return appointment;
};

export const deleteAppointment = async (id: string) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        if (!res.data) {
            throw new Error('Failed to delete appointment');
        }
        return res.data;
    } catch (error) {
        throw new Error('Error deleting appointment');
    }
};

export const updateAppointment = async ({
    id,
    updatedData
}: {
    id: string;
    updatedData: IAppointmentForm;
}) => {
    try {
        const res = await axios.patch(`${API_URL}/${id}`, updatedData);
        if (!res.data) {
            throw new Error('Failed to update appointment');
        }
        return res.data.data;
    } catch (error) {
        throw new Error('Error updating appointment');
    }
};

export const createAppointment = async (newAppointmentData: Omit<IAppointmentForm, 'notes'>) => {
    try {
        const res = await axios.post(`${API_URL}`, newAppointmentData);
        if (!res.data) {
            throw new Error('Failed to create appointment');
        }
        return res.data;
    } catch (error) {
        throw new Error('Error creating appointment');
    }
};

export const cancelAppointment = async (id: string) => {
    try {
        const res = await axios.patch(`${API_URL}/${id}`, {
            status: 'cancelled'
        });
        if (!res.data) {
            throw new Error('Failed to cancel appointment');
        }
        return res.data;
    } catch (error) {
        throw new Error('Error cancelling appointment');
    }
};
