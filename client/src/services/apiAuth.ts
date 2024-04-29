import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}/auth`;

export const login = async (formData: any) => {
    try {
        const res = await axios.post(`${API_URL}/login`, {
            email: formData.email,
            password: formData.password
        });

        const { data } = res;

        return {
            status: 'success',
            data
        };
    } catch (e: any) {
        return {
            status: 'error',
            message: e.response.data.message
        };
    }
};
