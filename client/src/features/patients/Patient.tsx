import {useState} from 'react';
import MedicalHistory from './MedicalHistory.tsx';
import DisplayField from "../../ui/DisplayField.tsx";
import PageHeader from "../../ui/PageHeader.tsx";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {getPatient} from "../../services/apiPatients.ts";
import Loading from "../../ui/Loading.tsx";

export default function Patient() {
    const [editMode, setEditMode] = useState(false);

    const { id } = useParams();


    const { data: patient, isLoading } = useQuery({
        queryKey: ['patient', id],
        queryFn: () => getPatient(id as string)
    });

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    console.log(patient)


    if (isLoading) {
        return <Loading />;
    }

    const lastInBodyScores = patient.medicalHistory.inBodyScores[patient.medicalHistory.inBodyScores.length - 1];

    return (
        <div className="px-4 sm:px-6 lg:px-8">

            <PageHeader
                title={`${patient.firstName} ${patient.lastName}`}
                description={"A detailed view of this patient."}
                isInEditMode={editMode}
                isInEditModeText={"Save Changes"}
                isNotInEditModeText={"Edit Patient"}
                saveChangesHandler={() => {}}
                editToggle={handleEditToggle}
            />

            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Personal Information
                        </h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <DisplayField label={"First Name"} value={patient.firstName}/>
                            <DisplayField label={"Last Name"} value={patient.lastName}/>
                            <DisplayField label={"Email"} value={patient.email}/>
                            <DisplayField label={"Phone Number"} value={patient.phoneNumber} containerClassName={"sm:col-span-1"}/>
                            <DisplayField label={"Address"} value={patient.address} containerClassName={"sm:col-span-5"}/>
                            <DisplayField label={"Gender"} value={patient.gender}/>
                            <DisplayField label={"Age"} value={patient.age}/>
                            <DisplayField label={"Job"} value={patient.job}/>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="sm:col-span-6 text-base font-semibold leading-7 text-gray-900">
                            InBody Test Results
                        </h2>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 mb-10 sm:grid-cols-6">
                            <DisplayField label={"Score"} value={lastInBodyScores?.score} isEditable={true} isInEditMode={editMode}/>
                            <DisplayField label={"Weight"} value={lastInBodyScores?.weight} isEditable={true} isInEditMode={editMode}/>
                            <DisplayField label={"Weight Control"} value={lastInBodyScores?.weightControl} isEditable={true} isInEditMode={editMode}/>
                            <DisplayField label={"Target Weight"} value={lastInBodyScores?.targetWeight} isEditable={true} isInEditMode={editMode}/>
                            <DisplayField label={"Fat"} value={lastInBodyScores?.fatPercentage} isEditable={true} isInEditMode={editMode}/>
                            <DisplayField label={"Muscle"} value={lastInBodyScores?.musclePercentage} isEditable={true} isInEditMode={editMode}/>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Medical History</h2>
                        <p className="mt-1 mb-10 text-sm leading-6 text-gray-600">Patients Medical information.</p>

                        <MedicalHistory history={patient.medicalHistory}/>
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
