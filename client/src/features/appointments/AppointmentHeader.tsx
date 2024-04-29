type TAppointmentHeaderProps = {
    patientName: string;
    cancelAppointment: () => void;
    saveChanges: () => void;
    editToggle: () => void;
    isEditMode: boolean;
};

const AppointmentHeader = ({
    patientName,
    cancelAppointment,
    saveChanges,
    editToggle,
    isEditMode
}: TAppointmentHeaderProps) => {
    return (
        <div className="sm:flex sm:items-center mb-10">
            <div className="sm:flex-auto">
                <h1 className="text-3xl font-semibold leading-6 text-gray-900">{patientName} Appointment</h1>
                <p className="mt-2 text-sm text-gray-700">A detailed view of the appointment.</p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                    type="button"
                    className="block rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={cancelAppointment}
                >
                    Cancel Appointment
                </button>
            </div>
            <div className="mt-4 sm:ml-2 sm:mt-0 sm:flex-none">
                <button
                    type="button"
                    onClick={isEditMode ? saveChanges : editToggle}
                    className="block rounded-md bg-secondary-light px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isEditMode ? 'Save Changes' : 'Edit Appointment'}
                </button>
            </div>
        </div>
    );
};

export default AppointmentHeader;
