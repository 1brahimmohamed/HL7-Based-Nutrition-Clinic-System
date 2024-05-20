import axios from 'axios';
const API_URL = `${import.meta.env.VITE_CDSS_URL}`;

export const predict = async (files: File[]) => {
    try {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('dicomFiles', file);
        });

        const res = await axios.post(`${API_URL}/many`, formData , {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        const {prediction} = res.data;

        return {
            status: 'success',
            prediction
        };

    } catch (e: any) {
        return {
            status: 'error',
            message: e.response.message
        };
    }
};
