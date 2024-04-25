import {getAllAppointments} from "../../services/apiAppointments.ts";
import {useLoaderData, useNavigate} from "react-router-dom";
import {EnvelopeIcon, PhoneIcon} from '@heroicons/react/20/solid'
import {Avatar} from "@mui/material";

const Appointments = () => {

    const data = useLoaderData();
    const navigate = useNavigate();

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center mb-10">
                <div className="sm:flex-auto">
                    <h1 className="text-3xl font-semibold leading-6 text-gray-900">Appointments</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the appointments you have including the name of the patient, phone number, day and
                        time.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-secondary-light px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Appointment
                    </button>
                </div>
            </div>

            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.appointments.map((appointment: any) => (

                    <li key={appointment.email} onClick={() => navigate(`/appointments/${appointment._id}`)}
                        className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-sm font-medium text-gray-900">{appointment.patient.fullName}</h3>
                                    <span
                                        className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {appointment.status}
                </span>
                                </div>
                                <p className="mt-1 truncate text-sm text-gray-500">{new Date(appointment.date).toLocaleDateString('en-US', {weekday: "long"})} {new Date(appointment.date).toLocaleDateString()}  </p>
                                <p className="mt-1 truncate text-sm text-gray-500">{new Date(appointment.date).toLocaleTimeString()} </p>
                            </div>
                            <Avatar className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" alt={appointment.patient.fullName}>
                                {appointment.patient.firstName.charAt(0)}{appointment.patient.lastName.charAt(0)}
                            </Avatar>
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="flex w-0 flex-1 overflow-hidden">
                                    <a
                                        href={`mailto:${appointment.patient.email}`}
                                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        {appointment.patient.email}
                                    </a>
                                </div>
                                <div className="-ml-px flex w-0 flex-1 overflow-hidden">
                                    <a
                                        href={`tel:${appointment.patient.phoneNumber}`}
                                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                    >
                                        <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
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
}


export const loader = async () => {
    const appointments = await getAllAppointments();
    return appointments;
}

export default Appointments;

