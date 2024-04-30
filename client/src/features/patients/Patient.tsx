import React, { useState, useEffect } from 'react';
import MedicalHistory from './MedicalHistory.tsx';
import DisplayField from '../../ui/DisplayField.tsx';
import PageHeader from '../../ui/PageHeader.tsx';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import EditableField from '../../ui/EditableField.tsx'; // Import EditableField component
import { useParams } from 'react-router-dom';
import { getPatient, updatePatient } from '../../services/apiPatients.ts';
import Loading from '../../ui/Loading.tsx';

export default function Patient() {
    const { id } = useParams();

    const queryClient = useQueryClient();

    const { data: patient, isLoading } = useQuery({
        queryKey: ['patient', id],
        queryFn: () => getPatient(id as string)
    });

    // State to manage edit mode
    const [editMode, setEditMode] = useState(false);

    // State to manage edited patient data
    const [editedPatientData, setEditedPatientData] = useState<{
        score: string | null;
        weight: string | null;
        weightControl: string | null;
        targetWeight: string | null;
        fat: string | null;
        muscle: string | null;
    }>({
        score: null,
        weight: null,
        weightControl: null,
        targetWeight: null,
        fat: null,
        muscle: null
    });
    // const [editedPatientData, setEditedPatientData] = useState({
    //     score: null,
    //     weight: null,
    //     weightControl: null,
    //     targetWeight: null,
    //     fat: null,
    //     muscle: null
    // });

    // Define lastInBodyScores within the scope of the component
    const lastInBodyScores =
        patient?.medicalHistory?.inBodyScores?.[patient.medicalHistory.inBodyScores.length - 1] || null;

    // Mutation hook for updating patient data
    const { mutate: updatePatientMutate } = useMutation({
        mutationFn: updatePatient,
        onError: (err: Error) => {
            toast.error(err.message, {
                duration: 2500
            });
        },
        onSuccess: () => {
            toast.success('Patient data Updated Successfully', {
                duration: 2500
            });
            setEditMode(false);
            queryClient.invalidateQueries({
                queryKey: ['patient', id]
            });
        }
    });

    // Set edited patient data when patient data is available
    useEffect(() => {
        if (patient && patient.medicalHistory && patient.medicalHistory.inBodyScores.length > 0) {
            const lastInBodyScores =
                patient.medicalHistory.inBodyScores[patient.medicalHistory.inBodyScores.length - 1];
            setEditedPatientData(lastInBodyScores);
        } else {
            // If no existing data, set editedPatientData to an empty object
            setEditedPatientData({
                score: null,
                weight: null,
                weightControl: null,
                targetWeight: null,
                fat: null,
                muscle: null
            });
        }
    }, [patient]);
    // Handle edit toggle
    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleScoreChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedPatientData({
            ...editedPatientData,
            score: e.target.value
        });
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedPatientData({
            ...editedPatientData,
            weight: e.target.value
        });
    };

    const handleWeightControlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedPatientData({
            ...editedPatientData,
            weightControl: e.target.value
        });
    };

    const handleTargetWeightChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedPatientData({
            ...editedPatientData,
            targetWeight: e.target.value
        });
    };

    const handleFatChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedPatientData({
            ...editedPatientData,
            fat: e.target.value
        });
    };

    const handleMuscleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedPatientData({
            ...editedPatientData,
            muscle: e.target.value
        });
    };

    // Save changes
    const saveChanges = async () => {
        // Call mutation to update patient data
        updatePatientMutate({
            id: patient._id,
            updatedData: editedPatientData
        });
    };

    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <PageHeader
                title={${patient.firstName} ${patient.lastName}}
                description={'A detailed view of this patient.'}
                isInEditMode={editMode}
                isInEditModeText={'Save Changes'}
                isNotInEditModeText={'Edit Patient'}
                saveChangesHandler={saveChanges}
                editToggle={handleEditToggle}
            />

            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Personal Information
                        </h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <DisplayField label={'First Name'} value={patient.firstName} />
                            <DisplayField label={'Last Name'} value={patient.lastName} />
                            <DisplayField label={'Email'} value={patient.email} />
                            <DisplayField
                                label={'Phone Number'}
                                value={patient.phoneNumber}
                                containerClassName={'sm:col-span-1'}
                            />
                            <DisplayField
                                label={'Address'}
                                value={patient.address}
                                containerClassName={'sm:col-span-5'}
                            />
                            <DisplayField label={'Gender'} value={patient.gender} />
                            <DisplayField label={'Age'} value={patient.age} />
                            <DisplayField label={'Job'} value={patient.job} />
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="sm:col-span-6 text-base font-semibold leading-7 text-gray-900">
                            InBody Test Results
                        </h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 mb-10 sm:grid-cols-6">
                            <DisplayField
                                label={'Score'}
                                value={lastInBodyScores?.score}
                                isEditable={true}
                                isInEditMode={editMode}
                            >
                                <textarea value={lastInBodyScores?.score} onChange={handleScoreChange} />
                            </DisplayField>

                            <DisplayField
                                label={'Weight'}
                                value={lastInBodyScores?.weight}
                                isEditable={true}
                                isInEditMode={editMode}
                            >
                                <textarea value={lastInBodyScores?.weight} onChange={handleWeightChange} />
                            </DisplayField>

                            <DisplayField
                                label={'Weight Control'}
                                value={lastInBodyScores?.weightControl}
                                isEditable={true}
                                isInEditMode={editMode}
                            >
                                <textarea
                                    value={lastInBodyScores?.weightControl}
                                    onChange={handleWeightControlChange}
                                />
                            </DisplayField>

                            <DisplayField
                                label={'Target Weight'}
                                value={lastInBodyScores?.targetWeight}
                                isEditable={true}
                                isInEditMode={editMode}
                            >
                                <textarea
                                    value={lastInBodyScores?.targetWeight}
                                    onChange={handleTargetWeightChange}
                                />
                            </DisplayField>

                            <DisplayField
                                label={'Fat'}
                                value={lastInBodyScores?.fatPercentage}
                                isEditable={true}
                                isInEditMode={editMode}
                            >
                                <textarea
                                    value={lastInBodyScores?.fatPercentage}
                                    onChange={handleFatChange}
                                />
                            </DisplayField>

                            <DisplayField
                                label={'Muscle'}
                                value={lastInBodyScores?.musclePercentage}
                                isEditable={true}
                                isInEditMode={editMode}
                            >
                                <textarea
                                    value={lastInBodyScores?.musclePercentage}
                                    onChange={handleMuscleChange}
                                />
                            </DisplayField>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Medical History</h2>
                        <p className="mt-1 mb-10 text-sm leading-6 text-gray-600">
                            Patients Medical information.
                        </p>

                        <MedicalHistory history={patient.medicalHistory} />
                    </div>
                </div>
                {/* <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-secondary-light px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div> */}
            </form>
        </div>
    );
}