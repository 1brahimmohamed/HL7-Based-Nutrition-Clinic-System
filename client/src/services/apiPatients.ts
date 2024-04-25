import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/patient`;

export const getAllPatients = async () => {

    const res = await axios.get(`${API_URL}`);

    if (!res.data) {
        throw new Error("Failed to fetch all patients");
    }

    const { data } = res;

    return data.data;
};


