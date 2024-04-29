import { cancelAppointment, getAppointment, updateAppointment } from '../../services/apiAppointments.ts';
import React, { useEffect, useState } from 'react';
import AppointmentHeader from './AppointmentHeader.tsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../../ui/Loading.tsx';
import { fireModal, generateTimeOptions, toProperCase } from '../../utils/helpers.tsx';

import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import EditableField from '../../ui/EditableField.tsx';

const Appointment = () => {
    const { id } = useParams();

    const { data: appointment, isLoading } = useQuery({
        queryKey: ['appointment', id],
        queryFn: () => getAppointment(id as string)
    });

    const [editMode, setEditMode] = useState(false);

    const [editedAppointmentData, setEditedAppointmentData] = useState<{
        day: string | null;
        notes: string | null;
        time: string | null;
        date: string | null;
    }>({
        day: null,
        notes: null,
        time: null,
        date: null
    });

    const queryClient = useQueryClient();

    const { mutate: cancelAppointmentMutate } = useMutation({
        mutationFn: cancelAppointment,
        onError: (err: Error) => {
            toast.error(err.message, {
                duration: 2500
            });
        },
        onSuccess: () => {
            toast.success('Appointment Cancelled Successfully', {
                duration: 2500
            });

            queryClient.invalidateQueries({
                queryKey: ['appointment', id]
            });
        }
    });

    const { mutate: updateAppointmentMutate } = useMutation({
        mutationFn: updateAppointment,
        onError: (err: Error) => {
            toast.error(err.message, {
                duration: 2500
            });
        },
        onSuccess: () => {
            toast.success('Appointment Updated Successfully', {
                duration: 2500
            });
            setEditMode(false);
            queryClient.invalidateQueries({
                queryKey: ['appointment', id]
            });
        }
    });

    useEffect(() => {
        if (appointment) {
            setEditedAppointmentData({
                day: new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long' }),
                time: new Date(appointment.date).toLocaleTimeString(),
                date: new Date(appointment.date).toLocaleDateString(),
                notes: appointment.notes
            });
        }
    }, [appointment]);

    if (isLoading) {
        return <Loading />;
    }

    const handleCancelAppointment = async () => {
        fireModal('Are you sure you want to cancel this appointment?', () =>
            cancelAppointmentMutate(appointment._id)
        );
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;

        setEditedAppointmentData({
            ...editedAppointmentData,
            date: newDate,
            day: new Date(newDate).toLocaleDateString('en-US', { weekday: 'long' })
        });
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEditedAppointmentData({
            ...editedAppointmentData,
            time: e.target.value
        });
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedAppointmentData({
            ...editedAppointmentData,
            notes: e.target.value
        });
    };

    const saveChanges = async () => {
        const updatedData = {
            ...appointment,
            date: new Date(`${editedAppointmentData.date} ${editedAppointmentData.time}`),
            notes: editedAppointmentData.notes
        };

        updateAppointmentMutate({
            id: appointment._id,
            updatedData
        });
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <AppointmentHeader
                patientName={appointment.patient.firstName}
                cancelAppointment={handleCancelAppointment}
                saveChanges={saveChanges}
                editToggle={handleEditToggle}
                isEditMode={editMode}
            />

            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    {/* Static Patient Name */}

                    <EditableField
                        label={'Patient Name'}
                        value={appointment.patient.fullName}
                        isEditable={false}
                    />
                    <EditableField
                        label={'Status'}
                        value={toProperCase(appointment.status)}
                        isEditable={false}
                    />
                    <EditableField label={'Day'} value={editedAppointmentData.day!} isEditable={false} />

                    {/* Editable Date */}
                    <EditableField
                        label={'Date'}
                        value={new Date(appointment.date).toLocaleDateString()}
                        isEditable={true}
                        editMode={editMode}
                    >
                        <input type="date" value={editedAppointmentData.date!} onChange={handleDateChange} />
                    </EditableField>

                    {/* Editable Time */}
                    <EditableField
                        label={'Time'}
                        value={new Date(appointment.date).toLocaleTimeString()}
                        isEditable={true}
                        editMode={editMode}
                    >
                        <select value={editedAppointmentData.time!} onChange={handleTimeChange}>
                            {generateTimeOptions()}
                        </select>
                    </EditableField>

                    {/* Static Phone Number */}
                    <EditableField
                        label={'Phone Number'}
                        value={appointment.patient.phoneNumber}
                        isEditable={false}
                    />

                    {/* Static Email */}
                    <EditableField label={'Email'} value={appointment.patient.email} isEditable={false} />

                    <EditableField
                        label={'Notes'}
                        value={appointment.notes}
                        isEditable={false}
                        editMode={editMode}
                    >
                        <textarea value={editedAppointmentData.notes!} onChange={handleNotesChange} />
                    </EditableField>
                </dl>
            </div>
        </div>
    );
};

export default Appointment;
