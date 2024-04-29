import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}/patient`;

export const getAllPatients = async () => {
    const res = await axios.get(`${API_URL}`);

    if (!res.data) {
        throw new Error('Failed to fetch all patients');
    }

    const { data } = res;

    return data.data;
};

export const getPatient = async (id: string) => {
    const res = await axios.get(`${API_URL}/${id}`);

    if (!res.data) {
        console.log('err');
        throw new Error('Failed to fetch patient');
    }

    const { data } = res;

    return data.data;
};

export const deletePatient = async (id: string) => {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        if (!res.data) {
            throw new Error('Failed to delete patient');
        }
        return res.data;
    } catch (error) {
        throw new Error('Error deleting patient');
    }
};

export const updatePatient = async (id: string, updatedData: any) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, updatedData);
        if (!res.data) {
            console.error('Error updating patient:', res.data);
            throw new Error('Failed to update patient');
        }
        console.log('Patient updated successfully:', res.data);
        return res.data.data;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
};
