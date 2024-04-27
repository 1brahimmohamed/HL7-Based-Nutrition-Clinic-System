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
    console.log("err");
    throw new Error("Failed to fetch appointment");
  }

  const { data } = res;

  return data.data;
};

export const deleteAppointment = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    if (!res.data) {
      throw new Error("Failed to delete appointment");
    }
    return res.data;
  } catch (error) {
    throw new Error("Error deleting appointment");
  }
};

export const updateAppointment = async (id: string, updatedData: any) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, updatedData);
    if (!res.data) {
      console.error("Error updating appointment:", res.data);
      throw new Error("Failed to update appointment");
    }
    console.log("Appointment updated successfully:", res.data);
    return res.data.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
};
