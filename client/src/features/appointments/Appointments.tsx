import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AppointmentCard from './AppointmentCard.tsx';
import AddAppointmentModal from './AddAppointmentModal.tsx';
import PageHeaderWithButton from '../../ui/PageHeaderWithButton.tsx';
import Loading from '../../ui/Loading.tsx';
import { getAllAppointments } from '../../services/apiAppointments.ts';
import { IAppointment } from '../../types/appointment';

const Appointments = () => {
    const [showModal, setShowModal] = useState(false);

    const { data: appointments, isLoading } = useQuery({
        queryKey: ['appointments'],
        queryFn: getAllAppointments
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <PageHeaderWithButton
                title={'Appointments'}
                description={
                    'A list of all the appointments you have including the name of the patient, phone number, day and time.'
                }
                buttonText={'Add Appointment'}
                buttonOnClick={() => setShowModal(true)}
            />

            {/* Modal for adding appointment */}
            {showModal && <AddAppointmentModal onCloseModal={() => setShowModal(false)} />}

            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {appointments.map((appointment: IAppointment) => (
                    <AppointmentCard key={appointment._id} appointment={appointment} />
                ))}
            </ul>
        </div>
    );
};

export default Appointments;
