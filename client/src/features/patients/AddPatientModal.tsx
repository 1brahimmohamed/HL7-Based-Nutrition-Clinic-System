import InputField from '../../ui/inputField.tsx';
import React, {useState} from 'react';
import SelectInput from '../../ui/SelectInput.tsx';
import toast from 'react-hot-toast';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createPatient} from "../../services/apiPatients.ts";


const AddAppointmentModal = ({onCloseModal}: { onCloseModal: () => void }) => {
    const [newPatientData, setNewPatientData] = useState({
        // Initialize state for new appointment data
        // You can include fields like patient name, date, time, etc.
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        job: '',
        phoneNumber: '',
        address: '',
        birthdate: ''
    });

    const queryClient = useQueryClient();

    const {isLoading, mutate} = useMutation({
        mutationFn: createPatient,
        onError: (err: Error) => {
            toast.error(err.message, {
                duration: 2500
            });
        },
        onSuccess: () => {
            toast.success('Patient Created successfully', {
                duration: 2500
            });

            queryClient.invalidateQueries({
                queryKey: ['patients']
            });
            onCloseModal();
        }
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setNewPatientData({...newPatientData, [name]: value});
    };
    //
    //
    const handleAddPatient = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newPatientData.firstName || !newPatientData.lastName || !newPatientData.email || !newPatientData.gender) {
            toast.error('Please fill in all fields');
            return;
        }

        mutate({
            ...newPatientData,
            birthdate: new Date(newPatientData.birthdate)
        });

    }


return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
        {/* Overlay Background */}
        <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="relative bg-white w-1/4 rounded-lg shadow-lg">
            <form className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Add Patient</h2>
                {/* Form for adding appointment details */}

                <InputField
                    label={'First Name'}
                    labelFor={'firstName'}
                    inputId={'firstName'}
                    inputName={'firstName'}
                    inputType={'text'}
                    autoComplete={'off'}
                    isRequired={true}
                    containerClassName={'mb-4'}
                    value={newPatientData.firstName}
                    onChange={handleInputChange}
                />

                <InputField
                    label={'Last Name'}
                    labelFor={'lastName'}
                    inputId={'lastName'}
                    inputName={'lastName'}
                    inputType={'lastName'}
                    autoComplete={'off'}
                    isRequired={true}
                    containerClassName={'mb-4'}
                    value={newPatientData.lastName}
                    onChange={handleInputChange}
                />

                <InputField
                    label={'Email'}
                    labelFor={'email'}
                    inputId={'email'}
                    inputName={'email'}
                    inputType={'email'}
                    autoComplete={'off'}
                    isRequired={true}
                    containerClassName={'mb-4'}
                    value={newPatientData.email}
                    onChange={handleInputChange}
                />

                <SelectInput
                    label={'Gender'}
                    labelFor={'gender'}
                    selectId={'gender'}
                    selectName={'gender'}
                    defaultOption={'Select Gener'}
                    className={'mb-4'}
                    containerClassName={'mb-4'}
                    value={newPatientData.gender}
                    onChange={handleInputChange}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </SelectInput>

                <InputField
                    label={'Job'}
                    labelFor={'job'}
                    inputId={'job'}
                    inputName={'job'}
                    inputType={'text'}
                    autoComplete={'off'}
                    isRequired={true}
                    containerClassName={'mb-4'}
                    value={newPatientData.job}
                    onChange={handleInputChange}
                />

                <InputField
                    label={'Phone Number'}
                    labelFor={'phoneNumber'}
                    inputId={'phoneNumber'}
                    inputName={'phoneNumber'}
                    inputType={'tel'}
                    autoComplete={'off'}
                    isRequired={true}
                    containerClassName={'mb-4'}
                    value={newPatientData.phoneNumber}
                    onChange={handleInputChange}
                />

                <InputField
                    label={'Address'}
                    labelFor={'address'}
                    inputId={'address'}
                    inputName={'address'}
                    inputType={'text'}
                    autoComplete={'off'}
                    isRequired={true}
                    containerClassName={'mb-4'}
                    value={newPatientData.address}
                    onChange={handleInputChange}
                />

                <InputField
                    label={'Birthdate'}
                    labelFor={'birthdate'}
                    inputId={'birthdate'}
                    inputName={'birthdate'}
                    inputType={'date'}
                    autoComplete={'off'}
                    isRequired={true}
                    containerClassName={'mb-4'}
                    value={newPatientData.birthdate}
                    onChange={handleInputChange}
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        onClick={handleAddPatient}
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
                                    <circle cx="12" cy="12" r="10" className="opacity-25"/>
                                    <path fill="#fff" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
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
)
};


export default AddAppointmentModal;
