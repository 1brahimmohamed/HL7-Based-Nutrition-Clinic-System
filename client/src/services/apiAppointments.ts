import axios from "axios";

const API_URL = `${import.meta.env.VITE_BASE_URL}/appointment`;

export const getAllAppointments = async () => {

    const res = await axios.get(`${API_URL}`);

    if (!res.data) {
        throw new Error("Failed to fetch all appointments");
    }

    const { data } = res;

    return data.data;
};

export const getAppointment = async (id: string) => {


    const res = await axios.get(`${API_URL}/${id}`);

    if (!res.data) {
        console.log("err")
        throw new Error("Failed to fetch appointment");
    }

    const { data } = res;

    return data.data;
};


