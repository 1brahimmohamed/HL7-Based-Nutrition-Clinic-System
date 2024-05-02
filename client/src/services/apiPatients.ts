import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}/patient`;

export const getAllPatients = async () => {
    const res = await axios.get(`${API_URL}`);

    if (!res.data) {
        throw new Error('Failed to fetch all patients');
    }

    const {patients} = res.data.data;

    return patients;
};

export const getPatient = async (id: string) => {
    const res = await axios.get(`${API_URL}/${id}`);

    if (!res.data) {
        console.log('err');
        throw new Error('Failed to fetch patient');
    }

    const {patient} = res.data.data;

    return patient;
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

export const updatePatientLastInBodyScores = async (id: string, updatedScores: any, oldScores?: any) => {

    let lastScore = oldScores[0]
    lastScore = {
        ...lastScore,
        ...updatedScores
    }

    oldScores[0] = lastScore

    try {
        const res = await axios.patch(`${API_URL}/${id}/medical-history`, {inBodyScores: oldScores});
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

export const updatePatientMedicalHistory = async (id: string, updatedHistory: any) => {
    try {
        const res = await axios.patch(`${API_URL}/${id}/medical-history`, updatedHistory);
        if (!res.data) {
            throw new Error('Failed to update patient');
        }
        return res.data.data;
    } catch (error) {
        throw new Error('Error updating patient');
    }

}

export const createPatient = async (newPatientData: any) => {
    try {
        const res = await axios.post(`${API_URL}`, newPatientData);
        if (!res.data) {
            throw new Error('Failed to create patient');
        }
        return res.data.data;
    } catch (error) {
        throw new Error('Error creating patient');
    }
}


export const referencePatientToAnotherClinic = async (id: string, clinicId: string) => {
    try {
        const res = await axios.post(`${API_URL}/${id}/refer`, {clinicId});
        if (!res.data) {
            throw new Error('Failed to refer patient');
        }
        return res.data;
    } catch (error) {
        return error;
    }
}
