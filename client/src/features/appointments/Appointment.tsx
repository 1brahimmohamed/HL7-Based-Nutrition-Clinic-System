import { PaperClipIcon } from "@heroicons/react/20/solid";
import {
  getAppointment,
  updateAppointment,
} from "../../services/apiAppointments.ts";
import { deleteAppointment } from "../../services/apiAppointments.ts";
import { useLoaderData } from "react-router-dom";
import React, { useState } from "react";

const Appointment = ({ onDelete, onUpdate }) => {
  // if (!appointment) {
  //   return null; // Return null if appointment is undefined
  // }

  const data = useLoaderData();
  const [editMode, setEditMode] = useState(false);
  const [editedDate, setEditedDate] = useState(data.appointment.date);
  const [editedTime, setEditedTime] = useState(data.appointment.time);
  const [editedNotes, setEditedNotes] = useState(data.appointment.notes);
  const [editedDay, setEditedDay] = useState(
    new Date(data.appointment.date).toLocaleDateString("en-US", {
      weekday: "long",
    })
  );

  const handleCancelAppointment = async () => {
    try {
      // Call the API to delete the appointment by its ID
      await deleteAppointment(data.appointment._id);
      // Notify the parent component (Appointments) about the deletion
      onDelete(data.appointment._id);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setEditedDate(newDate);
    setEditedDay(
      new Date(newDate).toLocaleDateString("en-US", { weekday: "long" })
    );
  };

  const handleTimeChange = (e) => {
    setEditedTime(e.target.value);
  };

  const handleNotesChange = (e) => {
    setEditedNotes(e.target.value);
  };

  const saveChanges = async () => {
    try {
      const updatedData = {
        ...data.appointment,
        date: editedDate,
        time: editedTime,
        notes: editedNotes,
      };
      const updatedAppointment = await updateAppointment(
        data.appointment._id,
        updatedData
      );
      onUpdate(updatedAppointment);
      setEditMode(false);
      console.log("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 21; hour++) {
      // Loop from 9 AM to 9 PM
      for (let minutes = 0; minutes < 60; minutes += 30) {
        // Loop for 30-minute intervals
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

  console.log(data);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-10">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-semibold leading-6 text-gray-900">
            {data.appointment.patient.firstName} Appointment
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A detailed view of the appointment.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleCancelAppointment}
          >
            Cancel Appointment
          </button>
        </div>
        <div className="mt-4 sm:ml-2 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={editMode ? saveChanges : handleEditToggle}
            className="block rounded-md bg-secondary-light px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {editMode ? "Save Changes" : "Edit Appointment"}
          </button>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          {/* Static Patient Name */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Patient name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.appointment.patient.fullName}
            </dd>
          </div>
          {/* Editable Day */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {" "}
              Day
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {editedDay}
            </dd>
          </div>
          {/* Editable Date */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {" "}
              Date
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {editMode ? (
                <input
                  type="date"
                  value={editedDate}
                  onChange={handleDateChange}
                />
              ) : (
                new Date(data.appointment.date).toLocaleDateString()
              )}
            </dd>
          </div>
          {/* Editable Time */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {" "}
              Time
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {editMode ? (
                <select value={editedTime} onChange={handleTimeChange}>
                  {generateTimeOptions()}
                </select>
              ) : (
                new Date(data.appointment.date).toLocaleTimeString()
              )}
            </dd>
          </div>
          {/* Static Phone Number */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.appointment.patient.phoneNumber}
            </dd>
          </div>
          {/* Static Email */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.appointment.patient.email}
            </dd>
          </div>
          {/* Editable Notes */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Notes
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {editMode ? (
                <textarea value={editedNotes} onChange={handleNotesChange} />
              ) : (
                data.appointment.notes
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export const loader = async ({ params }: { params: any }) => {
  const { id } = params;
  const resp = await getAppointment(id);
  return resp;
};

export default Appointment;
