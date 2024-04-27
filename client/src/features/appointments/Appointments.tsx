import {
  getAllAppointments,
  updateAppointment,
} from "../../services/apiAppointments.ts";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { Avatar } from "@mui/material";
import Appointment from "./Appointment";
import { useState, useEffect } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const data = useLoaderData();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [newAppointmentData, setNewAppointmentData] = useState({
    // Initialize state for new appointment data
    // You can include fields like patient name, date, time, etc.
    patientName: "",
    email: "",
    phoneNumber: "",
    day: "",
    date: "",
    time: "",
  });

  // Load appointments when component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsData = await getAllAppointments();
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array to only run once when component mounts

  const handleDeleteAppointment = (deletedId) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment._id !== deletedId)
    );
  };

  // Function to update the appointment in the state and database
  const handleUpdateAppointment = async (updatedAppointment) => {
    try {
      // Call the API to update the appointment
      await updateAppointment(updatedAppointment._id, updatedAppointment);
      // Update the local state with the updated appointment
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === updatedAppointment._id
            ? updatedAppointment
            : appointment
        )
      );
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointmentData({ ...newAppointmentData, [name]: value });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const day = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: "long",
    });
    setNewAppointmentData({
      ...newAppointmentData,
      date: selectedDate,
      day: day,
    });
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 21; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        options.push(
          <option key={time} value={time}>
            {time}
          </option>
        );
      }
    }
    return options;
  };

  const handleAddAppointment = async () => {
    try {
      await addAppointment(newAppointmentData);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-10">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold leading-6 text-gray-900">
            Appointments
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the appointments you have including the name of the
            patient, phone number, day and time.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="block rounded-md bg-secondary-light px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Appointment
          </button>
        </div>
      </div>

      {/* Modal for adding appointment */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="relative bg-white w-96 rounded-lg shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Add Appointment</h2>
              {/* Form for adding appointment details */}
              <div className="mb-4">
                <label
                  htmlFor="patientName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={newAppointmentData.patientName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newAppointmentData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={newAppointmentData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newAppointmentData.date}
                  onChange={handleDateChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="day"
                  className="block text-sm font-medium text-gray-700"
                >
                  Day
                </label>
                <input
                  type="text"
                  id="day"
                  name="day"
                  value={newAppointmentData.day}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={newAppointmentData.time}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Time</option>
                  {generateTimeOptions()}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddAppointment}
                  className="block rounded-md bg-secondary-light px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="ml-3 block rounded-md bg-gray-200 px-3 py-2 text-center text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {data.appointments.map((appointment: any) => (
          <li
            key={appointment._id}
            onClick={() => navigate(`/appointments/${appointment._id}`)}
            appointment={appointment}
            onDelete={handleDeleteAppointment}
            onUpdate={handleUpdateAppointment}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            {/* <Appointment
              appointment={appointment}
              onDelete={handleDeleteAppointment}
              onUpdate={handleUpdateAppointment} // Pass onUpdate prop
            /> */}
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {appointment.patient.fullName}
                  </h3>
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {appointment.status}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {new Date(appointment.date).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}{" "}
                  {new Date(appointment.date).toLocaleDateString()}{" "}
                </p>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {new Date(appointment.date).toLocaleTimeString()}{" "}
                </p>
              </div>
              <Avatar
                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                alt={appointment.patient.fullName}
              >
                {appointment.patient.firstName.charAt(0)}
                {appointment.patient.lastName.charAt(0)}
              </Avatar>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1 overflow-hidden">
                  <a
                    href={`mailto:${appointment.patient.email}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <EnvelopeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {appointment.patient.email}
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1 overflow-hidden">
                  <a
                    href={`tel:${appointment.patient.phoneNumber}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <PhoneIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {appointment.patient.phoneNumber}
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const loader = async () => {
  const appointments = await getAllAppointments();
  return appointments;
};

export default Appointments;
