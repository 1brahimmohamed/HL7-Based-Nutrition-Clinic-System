import InputField from '../../ui/inputField.tsx';
import React, { useState } from 'react';
import SelectInput from '../../ui/SelectInput.tsx';
import toast from 'react-hot-toast';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { createAppointment } from '../../services/apiAppointments.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateTimeOptions } from '../../utils/helpers.tsx';

interface AuthUser {
    data: {
        doctor: {
            _id: string;
        };
    };
}

const AddAppointmentModal = ({ onCloseModal }: { onCloseModal: () => void }) => {
    const [newAppointmentData, setNewAppointmentData] = useState({
        // Initialize state for new appointment data
        // You can include fields like patient name, date, time, etc.
        patientId: '',
        day: '',
        date: '',
        time: ''
    });

    const auth = useAuthUser<AuthUser>();
    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation({
        mutationFn: createAppointment,
        onError: (err: Error) => {
            toast.error(err.message, {
                duration: 2500
            });
        },
        onSuccess: () => {
            toast.success('Appointment added successfully', {
                duration: 2500
            });

            queryClient.invalidateQueries({
                queryKey: ['appointments']
            });
            onCloseModal();
        }
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNewAppointmentData({ ...newAppointmentData, [name]: value });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        const day = new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long'
        });
        setNewAppointmentData({
            ...newAppointmentData,
            date: selectedDate,
            day: day
        });
    };

    const handleAddAppointment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newAppointmentData.patientId || !newAppointmentData.date || !newAppointmentData.time) {
            toast.error('Please fill in all fields');
            return;
        }

        if (!auth) return;

        const bodyData = {
            patient: newAppointmentData.patientId,
            doctor: auth.data.doctor._id,
            date: new Date(`${newAppointmentData.date} ${newAppointmentData.time}`)
        };

        mutate(bodyData);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
            {/* Overlay Background */}
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="relative bg-white w-1/4 rounded-lg shadow-lg">
                <form className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Add Appointment</h2>
                    {/* Form for adding appointment details */}

                    <InputField
                        label={'Patient Id'}
                        labelFor={'patientId'}
                        inputId={'patientId'}
                        inputName={'patientId'}
                        inputType={'text'}
                        autoComplete={'off'}
                        isRequired={true}
                        containerClassName={'mb-4'}
                        value={newAppointmentData.patientId}
                        onChange={handleInputChange}
                    />

                    <InputField
                        label={'Date'}
                        labelFor={'date'}
                        inputId={'date'}
                        inputName={'date'}
                        inputType={'date'}
                        autoComplete={'off'}
                        isRequired={true}
                        containerClassName={'mb-4'}
                        value={newAppointmentData.date}
                        onChange={handleDateChange}
                    />

                    <InputField
                        label={'Day'}
                        labelFor={'day'}
                        inputId={'day'}
                        inputName={'day'}
                        inputType={'text'}
                        autoComplete={'off'}
                        isRequired={true}
                        isReadOnly={true}
                        value={newAppointmentData.day}
                        containerClassName={'mb-4'}
                    />

                    <SelectInput
                        label={'Time'}
                        labelFor={'time'}
                        selectId={'time'}
                        selectName={'time'}
                        defaultOption={'Select Time'}
                        className={'mb-4'}
                        containerClassName={'mb-4'}
                        value={newAppointmentData.time}
                        onChange={handleInputChange}
                    >
                        {generateTimeOptions()}
                    </SelectInput>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            onClick={handleAddAppointment}
                            className="block rounded-md bg-secondary-light px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {isLoading ? (
                                <div className={'animate-spin'}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <circle cx="12" cy="12" r="10" className="opacity-25" />
                                        <path fill="#fff" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                            ) : (
                                'Add'
                            )}
                        </button>
                        <button
                            onClick={onCloseModal}
                            className="ml-3 block rounded-md bg-gray-200 px-3 py-2 text-center text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAppointmentModal;
